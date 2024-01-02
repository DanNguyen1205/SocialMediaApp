import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LeftSidebarOptions from '../components/leftSidebarOptions';
import axios, { Axios } from 'axios'
import Post from '../components/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



export const Profile = () => {
    const { id } = useParams();
    const [profilePicture, setProfilePicture] = useState();
    const [posts, setPosts] = useState([]);



    // Get all posts that the user has posted.
    useEffect(() => {
        const dataRes = async () => await axios.get("http://localhost:8081/Ioniagram/GetPostsProfile" + "/?userid=" + id)
            .then((res) => {
                console.log("User id gotten from params: " + id)
                console.log(res.data)

                setPosts(res.data);
                console.log("These are the posts frontend got back: " + posts);
            });

        dataRes();
    }, [])


    return (
        <>
            {/* First section of page. Contains icons such as home and search options. */}
            {/* TODO1:On md: media query make the icons bigger */}
            {/* TODO2:Move elements into their own components  */}
            <div id='container' className='grid grid-cols-4 h-screen h-full bg-gray-200'>
                <LeftSidebarOptions />

                {/* Middle section of page. Contains create new post and posts from other users */}
                <div className='col-span-3 md:col-span-2 bg-gray-600'>
                    <div id='profileBanner' className='flex flex-col bg-gray-600'>
                        <div className='flex flex-row px-4 justify-between items-center  h-56 bg-gray-400'>
                            <div className='flex flex-col gap-2'>
                                <section className='flex flex-row'>
                                    <div style={{ borderRadius: "50%", width: "70px", height: "70px" }} className='md:w-1/2 flex items-center justify-center bg-gray-600 hover:bg-gray-700'>
                                        {profilePicture == undefined ? <button><FontAwesomeIcon icon={faUser} style={{ width: "full", height: "2rem", width: "2rem", color: "#1a2844" }} /></button> : ""}
                                    </div>
                                    <h1 className='ml-2'>{posts[0]?.fullName}</h1>
                                </section>
                                <p>Follower count: </p>
                                <p>Post count: </p>
                            </div>


                            <button onClick={() => { }} className="bg-[#cdd9ed] hover:bg-[#a1b0c9] text-[#4B5563] font-bold py-2 px-4 rounded">
                                Follow
                            </button>
                        </div>
                    </div>
                    {/* Posts from other users */}
                    {posts?.map((post) => {
                        return <Post caption={post.caption} imageName={post.imageName} imageUrl={post.imageUrl} fullName={post.fullName} userid={id} />
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

export default Profile