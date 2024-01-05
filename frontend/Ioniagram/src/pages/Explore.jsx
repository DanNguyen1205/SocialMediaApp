import React from 'react'
import { useQuery } from '@tanstack/react-query';
import LeftSidebarOptions from '../components/leftSidebarOptions';
import { getExplorePosts } from '../api/posts'
import Post from '../components/Post';


export const Explore = () => {
    const getExplorePostsQuery = useQuery({
        queryKey: ["getExplorePostsQuery"],
        queryFn: async () => {
          const data = await getExplorePosts()
          return data;
        },
    })

  return (
    <>
      <div id='container' className='grid grid-cols-4 h-screen h-full bg-gray-200'>
        <LeftSidebarOptions/>

        {/* Middle section of page. Contains create new post and posts from other users */}
        <div className='col-span-3 md:col-span-2 bg-gray-600'>


          {/* Explore posts */}
          {getExplorePostsQuery.data?.map((post) => {
            return (<Post caption={post.caption} imageName={post.imageName} imageUrl={post.imageUrl} fullName={post.fullName} userid={post.userid} postid={post.idposts}/>)
          })}
        </div>

        {/* Third section */}
        <div className='hidden md:block bg-gray-900 text-white'>
          Get explore gets posts randomly so when mutation happens the order of the posts get randomized as well. 
          Eventual fix when posts are ordered by date of creation. 
        </div>
      </div>
    </>
  )
}

export default Explore