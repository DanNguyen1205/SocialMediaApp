const multer = require('multer')
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const crypto = require('crypto');
const sharp = require('sharp');
require('dotenv').config();

//Config
const app = express();
app.use(cors());
app.use(express.json());

//Multer setup
//Store images in memory not disk
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
upload.single('image')

//S3 setup client
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

//Utility fucntion(s)
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


//Connection
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.username,
    password: process.env.password,
    database: process.env.database
})

//Endpoint signup
app.post('/Ioniagram/Signup', (req, res) => {

    // SQL statements
    const sqlQueryEmail = "SELECT email FROM users WHERE email=(?)"
    const sql = "INSERT INTO users (`fullName`, `age`, `email`, `password`) VALUES (?)";
    //Values from the post request
    const values = [
        req.body.fullName,
        req.body.age,
        req.body.email,
        req.body.password
    ]

    //Check if email already exist in DB
    db.query(sqlQueryEmail, [req.body.email], (err, data) => {
        console.log(process.env.user);

        if (err) {
            console.log("Signup error 1" + err)
            return res.json(err)
        } else {
            //If it does not exist insert into DB
            if (data.length == 0) {
                console.log("Email does not already exist, inserting into DB:")
                db.query(sql, [values], (err, data) => {
                    if (err) {
                        console.log("Signup error 2" + err)
                        return res.json(err)
                    }
                    return res.json(data);
                })
            } else {
                console.log("Email already exists.")
                return res.status(400).send("Email already exists")
            }
        }
    })
})

//Endpoint login
app.post('/Ioniagram/Login', (req, res) => {
    const sqlGetLogin = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";

    db.query(sqlGetLogin, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log("Login error")
            return res.json("Error");
        }
        else if (data.length > 0) {
            console.log("Login user found")
            return res.json(data);
        } else {
            console.log(data)
            console.log("data")
            return res.json("Failed login")
        }
    })
})

//Endpoint post
app.post('/Ioniagram/Post', upload.single('image'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.body", req.file)

    //resize image
    const buffer = await sharp(req.file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer()

    //Use s3 client to send to our s3 bucket. 
    //Setup a command to use for our s3 client.

    const imageName = randomImageName();
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)

    //Send additional info about post to DB
    const sqlPost = "INSERT INTO posts (`caption`, `imageName`, `userid`) VALUES (?)";

    const values = [
        req.body.caption,
        imageName,
        req.query.userid
    ]

    db.query(sqlPost, [values], (err, data) => {
        if (err) {
            console.log("Post error" + err)
            return res.json(err)
        }
        return res.json(data);
    })
})

//Endpoint get posts for the logged user
app.get("/Ioniagram/GetPosts/", async (req, res) => {
    //Get posts for everyone the user follows
    //Inner join posts and relationships and then get all posts where the followerUserId is of the req.param.userid
    const sqlGetPosts = "SELECT p.*, fullName, idusers FROM posts p INNER JOIN relationships r ON (r.followedUserid = p.userid) JOIN users u ON (r.followedUserid = u.idusers) WHERE r.followerUserid = ?"

    getPosts(sqlGetPosts, [req.query.userid], res)
})

//Endpoint get posts other user profile
app.get("/Ioniagram/GetPostsProfile/", async (req, res) => {
    //Get posts for everyone the user follows
    //Inner join posts and relationships and then get all posts where the followerUserId is of the req.param.userid
    const sqlGetPosts = "SELECT p.*, fullName FROM posts p INNER JOIN users u ON (p.userid = u.idusers) WHERE userid=(?)"

    getPosts(sqlGetPosts, [req.query.userid], res)
})

function getPosts(sqlStatement, id, res){
    db.query(sqlStatement, id, async (err, data) => {
        if (err) {
            console.log("Get posts error: " + err)
            return res.json(err)
        } else if (data.length > 0) {
            const posts = data 

            //Retrieve images from S3 bucket. 
            //Make a signed url for every image that the user can access. 
            for (const post of posts) {
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: post.imageName
                }
    
                //s3 setup to retrieve image signed url
                const command = new GetObjectCommand(getObjectParams)
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
                post.imageUrl = url;
            }

            res.json(posts);
            console.log("--------------------------------------------");
            console.log(posts);
        }
        else {
            //User does not follow anyone
            return res.json(data);
        }

    })
}



//Backend listening on port 8081. 
app.listen(8081, () => {
    console.log("listening...");
})