import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const Post = ({ caption, imageName, imageUrl }) => {
  return (
    <>
      <div id='postContainer' className='flex flex-auto justify-center shrink  items-center'>
        <div id='post' className='w-full lg:w-3/5 flex flex-col justify-center items-center bg-blue-800 border-2'>
          <h1 className='truncate w-1/2'>{imageName}</h1>
          <p>{caption}</p>
          <img className='rounded w-full' src={imageUrl} alt="" />

          <div id='postOptions' className='bg-gray-200 flex flex-row p-2 justify-between items-center h-14 mb-10'>
            <div id="postOptionsIcons">
              <button>
                <FontAwesomeIcon icon={faHeart} style={{ height: "2rem", width: "2rem", color: "#cdd9ed", marginRight: "10px" }} />
              </button>

            </div>
          </div>

        </div>
      </div>


    </>
  )
}

export default Post