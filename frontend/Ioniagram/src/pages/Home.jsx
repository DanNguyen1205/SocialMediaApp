import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faUser, faMessage, faBookmark, faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons'
import IoniaIcon from "../images/Ionia_Crest_icon.webp"
import "../main.css"
import { useAuth } from '../components/auth'
import { useNavigate } from 'react-router-dom'
import axios, { Axios } from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, getPosts } from '../api/posts'

import Post from '../components/Post';
import LeftSidebarOptions from '../components/leftSidebarOptions';

export const Home = () => {
  const [file, setFile] = useState()
  const [caption, setCaption] = useState("")
  const [posts, setPosts] = useState([]);
  const [userid, setUserid] = useState(JSON.parse(localStorage.getItem("userid")));

  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const getPostQuery = useQuery({
    queryKey: ["getPostQuery"],
    queryFn: () => {
      const data = getPosts()
      return data;
    },
  })

  const postMutation = useMutation({
    mutationFn: createPost,
    onSuccess: data => {
      queryClient.invalidateQueries(["getPostQuery"], {exact:true})
      // navigate(0)
    }
  })

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", file)
    formData.append("caption", caption)

    postMutation.mutate({
      formData: formData,
      userid: userid
    })
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  if(getPostQuery.isLoading){
    return <div>Loading ...</div>
  }

  return (
    <>
      <div id='container' className='grid grid-cols-4 h-screen h-full bg-gray-200'>
        <LeftSidebarOptions/>

        {/* Middle section of page. Contains create new post and posts from other users */}
        <div className='col-span-3 md:col-span-2 bg-gray-600'>
          <div id='postSection' className='flex flex-col bg-gray-800'>

            <form onSubmit={submit}>
              <textarea onChange={e => setCaption(e.target.value)} id="message" rows="4" className="block resize-none p-2.5 w-full h-56 text-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              <div id='postOptions' className='flex flex-row p-2 justify-between items-center h-14'>
                <div id="postOptionsIcons">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <FontAwesomeIcon icon={faImage} style={{ height: "2rem", width: "2rem", color: "#cdd9ed", marginRight: "10px" }} />
                  </label>
                  <input name='image' className='hidden' id='file-upload' onChange={fileSelected} type="file" accept='image/*' src='' />
                </div>

                <button type='submit' className="bg-[#cdd9ed] hover:bg-[#a1b0c9] text-[#4B5563] font-bold py-2 px-4 rounded">
                  POST
                </button>
              </div>
            </form>

          </div>

          {/* Posts from other users */}
          {getPostQuery.data?.map((post) => {
            return (<Post caption={post.caption} imageName={post.imageName} imageUrl={post.imageUrl} fullName={post.fullName} userid={post.userid} postid={post.idposts}/>)
          })}
        </div>

        {/* Third section */}
        <div className='hidden md:block bg-gray-900 text-white'>
        </div>
      </div>
    </>
  )
}

export default Home