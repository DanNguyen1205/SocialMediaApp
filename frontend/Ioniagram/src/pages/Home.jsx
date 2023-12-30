import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faFaceSmile, faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons'
import IoniaIcon from "../images/Ionia_Crest_icon.webp"
import "../main.css"
import { useAuth } from '../components/auth'
import { useNavigate } from 'react-router-dom'
import axios, { Axios } from 'axios'
import { useQuery } from '@tanstack/react-query';

import Post from '../components/Post'

export const Home = () => {
  const [file, setFile] = useState()
  const [caption, setCaption] = useState("")
  const [posts, setPosts] = useState();

  const auth = useAuth();
  const navigate = useNavigate();

  //Load posts the user follows 
  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem("userid"))

    const dataRes = async () => await axios.get("http://localhost:8081/Ioniagram/GetPosts" + "/?userid=" +  userid)
    .then((res) => {

      setPosts(res.data);
      console.log(posts);
    });

    dataRes();
  }, [])

  const handleLogout = () => {
    auth.logout();
    navigate("/Ioniagram/Login")
  }

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", file)
    formData.append("caption", caption)
    await axios.post("http://localhost:8081/Ioniagram/Post", formData, { headers: { 'Content-Type': 'multipart/form-data' } })

    navigate("/Ioniagram")
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }


  //Load posts that the user follows
  // const { data: postData, isLoading } = useQuery({
  //   queryKey: ["queryPost"],
  //   queryFn: () => {
  //     const userid = JSON.parse(localStorage.getItem("userid"))
  //     axios.get("http://localhost:8081/Ioniagram/GetPosts" + "/?userid=" + userid)
  //       .then((res) => {
  //         console.log("RESPONSE FROM ENDPOINT: " + res.data)
  //         setPosts(data);

  //         console.log("THE POSTS: " + posts);
  //       });

  //   }
  // })

  return (
    <>
      {/* First section of page. Contains icons such as home and search options. */}
      {/* TODO1:On md: media query make the icons bigger */}
      {/* TODO2:Move elements into their own components  */}
      <div id='container' className='grid grid-cols-4 h-screen h-full bg-gray-200'>
        <div className='flex flex-col gap-3 items-end bg-gray-900'>

          <div className='mr-10 mt-5 hover:bg-gray-800' style={{ borderRadius: "50%", width: "50px", height: "50px" }}>
            <img src={IoniaIcon} className='' alt="" />
          </div>

          <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: "full", color: "#cdd9ed" }} />
          </div>

          <div style={{ borderRadius: "50%", width: "40px", height: "40px" }} className='md:w-1/2 mr-10 flex justify-center items-center hover:bg-gray-800'>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: "full", color: "#cdd9ed" }} />
          </div>

          <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: "full", color: "#cdd9ed" }} />
          </div>

          <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{ borderRadius: "50%", width: "40px", height: "40px" }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: "full", color: "#cdd9ed" }} />
          </div>

          <button onClick={handleLogout} class="mr-1 md:mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>

        </div>

        {/* Middle section of page. Contains create new post and posts from other users */}
        <div className='col-span-3 md:col-span-2 bg-blue-500'>
          <div id='postSection' className='flex flex-col bg-gray-600'>

            <form onSubmit={submit}>
              <textarea onChange={e => setCaption(e.target.value)} id="message" rows="4" class="block resize-none p-2.5 w-full h-56 text-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              <div id='postOptions' className='flex flex-row p-2 justify-between items-center h-14'>
                <div id="postOptionsIcons">
                  <label for="file-upload" class="custom-file-upload">
                    <FontAwesomeIcon icon={faImage} style={{ height: "2rem", width: "2rem", color: "#cdd9ed", marginRight: "10px" }} />
                  </label>
                  <input name='image' className='hidden' id='file-upload' onChange={fileSelected} type="file" accept='image/*' src='' />
                  {/* <button onChange={fileSelected} type='file' ac>
                  <FontAwesomeIcon icon={faImage} style={{ height: "2rem", width: "2rem", color: "#cdd9ed", marginRight:"10px"}} />
                  </button> */}
                  {/* <button>
                  <FontAwesomeIcon icon={faFaceSmile} style={{height: "2rem", width: "2rem", color: "#cdd9ed",}} />              
                  </button> */}
                </div>



                <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  POST
                </button>
              </div>
            </form>

          </div>

          {/* Posts from other users */}
          {posts?.map((post) => {
            return <Post caption={post.caption} imageName={post.imageName} />
          })}
        </div>

        {/* Third section */}
        <div className='hidden md:block bg-gray-900 text-white'>
          Filler page for added functionality
        </div>
      </div>
    </>
  )
}

export default Home