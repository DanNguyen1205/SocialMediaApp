import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faFaceSmile, faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons'
import IoniaIcon from "../images/Ionia_Crest_icon.webp"
import "../main.css"

export const Home = () => {
  return (
    <>
    {/* First section of page. Contains icons such as home and search options. */}
    {/* TODO:On md: media query make the icons bigger */}
    <div id='container' className='grid grid-cols-4 h-screen h-full bg-gray-200'>
      <div className='flex flex-col gap-3 items-end bg-gray-900'>
        
        <div className='mr-10 mt-5 hover:bg-gray-800' style={{borderRadius: "50%", width:"50px", height:"50px" }}>
          <img src={IoniaIcon} className='' alt="" />
        </div>
        
        <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{borderRadius: "50%", width:"40px", height:"40px" }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{width:"full", color: "#cdd9ed"}}/>
        </div>

        <div style={{borderRadius: "50%", width:"40px", height:"40px" }} className='md:w-1/2 mr-10 flex justify-center items-center hover:bg-gray-800'>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{width:"full", color: "#cdd9ed"}}/>
        </div>

        <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{borderRadius: "50%", width:"40px", height:"40px" }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{width:"full", color: "#cdd9ed"}}/>
        </div>

        <div className='mr-10 flex justify-center items-center hover:bg-gray-800' style={{borderRadius: "50%", width:"40px", height:"40px" }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{width:"full", color: "#cdd9ed"}}/>
        </div>

      </div>

      {/* Middle section of page. Contains create new post and posts from other users */}
      <div className='col-span-3 md:col-span-2 bg-blue-500'>
        <div id='postSection' className='flex flex-col bg-gray-400'>
          <textarea id="message" rows="4" class="block resize-none p-2.5 w-full h-56 text-xl text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          
          <div id='postOptions' className='flex flex-row p-2 justify-between items-center h-14'>
              <div id="postOptionsIcons">
              <button className=''>
              <FontAwesomeIcon icon={faImage} style={{ height: "2rem", width: "2rem", color: "#cdd9ed", marginRight:"10px"}} />

              </button>
              <button>
              <FontAwesomeIcon icon={faFaceSmile} style={{height: "2rem", width: "2rem", color: "#cdd9ed",}} />              
              </button>
            </div>



            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">              
            POST
            </button>
          </div>
        </div>
      </div>

      <div className='hidden md:block bg-blue-200'>
        Filler page for added functionality
      </div>
    </div>
    </>
  )
}

export default Home