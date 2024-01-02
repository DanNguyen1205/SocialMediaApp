import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'


export const Post = ({ caption, imageName, imageUrl, fullName, profilePicture, userid }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();


  function likeHandler(){
    setLike(!like)
  }

  function profileHandler(userid){

    const url = "/Ioniagram/Profile/" + userid
    navigate(url)
  }
  
  return (
    <>
      <div id='postContainer' className='flex flex-auto justify-center items-center'>
        <div id='post' className='w-full lg:w-3/5 flex flex-col justify-center bg-gray-400 border-x-4 border-t-4 mb-1'>
          <section id='postUser' className='flex flex-row ml-2 mt-2'> 
            <div style={{ borderRadius: "50%", width: "50px", height: "50px" }} className='md:w-1/2 flex items-center justify-center bg-gray-600 hover:bg-gray-700'>
            {profilePicture == undefined ? <button onClick={() => profileHandler(userid)} ><FontAwesomeIcon icon={faUser} style={{width:"full", height: "2rem", width: "2rem", color:"#1a2844"}} /></button> : ""}
            </div>
            {/* <div style={{ borderRadius: "50%", width: "40px", height: "40px" }} className='md:w-1/2 mr-10 flex justify-center items-center hover:bg-gray-800'>
            <FontAwesomeIcon icon={faMessage} style={{ width: "full", color: "#71f2a8" }} />
            </div> */}
            
            <h1 className='ml-2'>{fullName}</h1>
          </section>
          <section id='postTitle' className='flex flex-col items-center p-2'>
            <h1 className='truncate w-1/2'>{imageName}</h1>
            <p>{caption}</p>
          </section>
          <img className='w-full' src={imageUrl} alt="" />
          <div id='postOptions' className='bg-gray-200 flex flex-row-reverse p-2'>
            <div id="postOptionsIcons">
              <button onClick={likeHandler}>
                <FontAwesomeIcon icon={faHeart} style={{ height: "2rem", width: "2rem", color: like ? "#ff5151" : "#ffb0b0", marginRight: "10px" }} />
              </button>

              <button>
                <FontAwesomeIcon icon={faComment} style={{ height: "2rem", width: "2rem", color: "#1a2844", marginRight: "10px" }} />
              </button>

            </div>
          </div>

        </div>
      </div>


    </>
  )
}

export default Post