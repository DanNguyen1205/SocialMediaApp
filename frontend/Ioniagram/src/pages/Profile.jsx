import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import LeftSidebarOptions from '../components/leftSidebarOptions';
import axios, { Axios } from 'axios'
import Post from '../components/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faImage } from '@fortawesome/free-solid-svg-icons'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostsProfile, getFollowers, follow, unfollow, createPost } from '../api/posts'



export const Profile = () => {
    const { id } = useParams();
    const [profilePicture, setProfilePicture] = useState();
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0)
    const [followerCount, setFollowerCount] = useState(0)
    const [followBoolean, setFollowBoolean] = useState(false)

    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")

    const queryClient = useQueryClient()

    const getPostsProfileQuery = useQuery({
        queryKey: ["getPostsProfileQuery", id],
        queryFn: async () => {
            const data = await getPostsProfile(id)
            setPostCount(data.length)
            setPosts(data)
            return data;
        },
    })

    const postMutation = useMutation({
        mutationFn: createPost,
        onSuccess: data => {
            queryClient.invalidateQueries(["getPostsProfileQuery", id], { exact: true })
            // navigate(0)
        }
    })

    const getFollowerQuery = useQuery({
        queryKey: ["getFollowerQuery", id],
        queryFn: async () => {
            console.log(id)
            const data = await getFollowers(id)
            setFollowerCount(data.length)

            if (data.some((e) => e.followerUserid == localStorage.getItem("userid"))) {
                setFollowBoolean(true);
            }

            return data;
        },
    })

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)

        postMutation.mutate({
            formData: formData,
            userid: localStorage.getItem("userid")
        })
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }


    function followHandler() {
        if (!followBoolean) {
            followMutation.mutate({
                followerUserid: localStorage.getItem("userid"),
                followedUserid: id
            })

        } else {
            unfollowMutation.mutate({
                followerUserid: localStorage.getItem("userid"),
                followedUserid: id
            })
        }

        setFollowBoolean(!followBoolean)
    }

    const followMutation = useMutation({
        mutationFn: follow,
        onSuccess: data => {
            queryClient.invalidateQueries(["getFollowerQuery", id], { exact: true })
        }
    })

    const unfollowMutation = useMutation({
        mutationFn: unfollow,
        onSuccess: data => {
            queryClient.invalidateQueries(["getFollowerQuery", id], { exact: true })
        }
    })

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
                                <p>Follower count: {followerCount}</p>
                                <p>Post count: {postCount}</p>
                            </div>

                            {id != localStorage.getItem("userid") &&
                                <button id='followButton' onClick={followHandler} style={{ backgroundColor: followBoolean ? "#cdd9ed" : "#616c80", color: !followBoolean && "white" }} className="hover:bg-[#a1b0c9] text-[#4B5563] font-bold py-2 px-4 rounded min-w-30">
                                    {followBoolean ? "Unfollow" : "Follow"}
                                </button>
                            }
                        </div>
                    </div>

                    {id == localStorage.getItem("userid") &&
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
                    }
                    {/* Posts from other users */}
                    {getPostsProfileQuery.data?.map((post) => {
                        return <Post caption={post.caption} imageName={post.imageName} imageUrl={post.imageUrl} fullName={post.fullName} userid={id} postid={post.idposts} />
                    })}
                </div>

                {/* Third section */}
                <div className='hidden md:block bg-gray-900 text-white'>
                </div>
            </div>
        </>
    )
}

export default Profile