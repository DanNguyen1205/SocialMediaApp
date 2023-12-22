const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config();

//Config
const app = express();
app.use(cors());
app.use(express.json());

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
        if (err) {
            console.log(err)
            return res.json(err)
        } else {
            //If it does not exist insert into DB
            if(data.length == 0){
                console.log("Email does not already exist, inserting into DB:")
                db.query(sql, [values], (err, data) => {
                    if (err) {
                        console.log(err)
                        return res.json(err)
                    }
                    return res.json(data);
                })
            }else{
                console.log("Email already exists.")
                return res.status(400).send("Email already exists")
            }
        }
    })
})

//Endpoint login
app.post('/Ioniagram/Login', (req, res) => {
    const sqlGetLogin = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";

    db.query(sqlGetLogin, [req.body.email, req.body.password], (err,data) => {
        if(err){
            console.log("Login error")
            return res.json("Error");
        }
        else if(data.length > 0){
            console.log("Login user found")
            return res.json("Success");
        }else{
            console.log(data)
            console.log("data")
            return res.json("Failed login")
        }
    })







})



//Backend listening on port 8081. 
app.listen(8081, () => {
    console.log("listening...");
})