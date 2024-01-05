import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import CommentSection from './CommentSection'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLikes, addLike, deleteLike, deletePost } from '../api/posts'


export const Post = ({ caption, imageName, imageUrl, fullName, profilePicture, userid, postid }) => {
  const [like, setLike] = useState(false);
  const [commentsShow, setCommentsShow] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);

  const navigate = useNavigate();
  const queryClient = useQueryClient()


  const getLikesQuery = useQuery({
    queryKey: ["getLikesQuery", postid],
    queryFn: async () => {
      const data = await getLikes(postid)
      setNumberOfLikes(data.length)

      // if(data != []){
      //   setNumberOfLikes(data.length)
      // }

      if (data.some((e) => e.userid == localStorage.getItem("userid"))) {
        setLike(true);
      }

      return data;
    },
  })

  const addLikeMutation = useMutation({
    mutationFn: addLike,
    onSuccess: data => {
      queryClient.invalidateQueries(["getLikesQuery", postid], { exact: true })
    }
  })

  const deleteLikeMutation = useMutation({
    mutationFn: deleteLike,
    onSuccess: data => {
      queryClient.invalidateQueries(["getLikesQuery", postid], { exact: true })
    }
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: data => {
      queryClient.invalidateQueries(["getPostQuery"], { exact: true })
      queryClient.invalidateQueries(["getPostsProfileQuery"])
    }
  })

  function likeHandler() {
    if (!like) {
      addLikeMutation.mutate({
        userid: localStorage.getItem("userid"),
        postid: postid
      })
    } else {
      deleteLikeMutation.mutate({
        userid: localStorage.getItem("userid"),
        postid: postid
      })
    }

    setLike(!like)
  }

  function commentHandler() {
    setCommentsShow(!commentsShow)
  }

  function profileHandler(userid) {
    const url = "/Ioniagram/Profile/" + userid
    navigate(url)
  }

  function deletePostHandler() {

    deletePostMutation.mutate({
      userid: localStorage.getItem("userid"),
      postid: postid
    })
  }

  return (
    <>
      <div id='postsContainer' className='flex flex-auto justify-center items-center'>
        <div id='post' style={{ position: "relative" }} className='w-full lg:w-3/5 flex flex-col justify-center bg-gray-400 border-x-4 border-t-4 mb-1'>
          <section id='postUser' className='flex flex-row ml-2 mt-2'>
            <div style={{ borderRadius: "50%", width: "50px", height: "50px" }} className='md:w-1/2 flex items-center justify-center bg-gray-600 hover:bg-gray-700'>
              {profilePicture == undefined ? <button onClick={() => profileHandler(userid)} ><FontAwesomeIcon icon={faUser} style={{ width: "full", height: "2rem", width: "2rem", color: "#1a2844" }} /></button> : ""}
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
          {userid == localStorage.getItem("userid") &&
            <button onClick={deletePostHandler} id='postDeleteButton' className='bg-[#c53d46f5] hover:bg-[#fd6161e2] text-[white] font-bold py-1 px-2 mr-1 mt-1 rounded'>Delete post</button>
          }
          <img className='w-full' src={imageUrl} alt="" />
          <div id='postOptions' className='bg-gray-200 flex flex-row-reverse p-2'>
            <div id="postOptionsIcons" className='flex flex-row'>
              <button onClick={likeHandler}>
                <FontAwesomeIcon icon={faHeart} style={{ height: "2rem", width: "2rem", color: like ? "#ff5151" : "#ffb0b0", marginRight: "10px" }} />
              </button>
              <div style={{ height: "2rem", width: "2rem", color: "#1a2844" }}>{numberOfLikes}</div>
              <button onClick={commentHandler}>
                <FontAwesomeIcon icon={faComment} style={{ height: "2rem", width: "2rem", color: "#1a2844", marginRight: "10px" }} />
              </button>
              <div style={{ height: "2rem", width: "2rem", color: "#1a2844" }}>{numberOfComments}</div>
            </div>
          </div>
          <CommentSection commentsShow={commentsShow} postid={postid} setNumberOfComments={setNumberOfComments} />
        </div>
      </div>


    </>
  )
}

export default Post