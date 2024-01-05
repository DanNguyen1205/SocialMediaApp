import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/posts'


export const Comment = ({ comment, fullName, commentid, commenterid, postid, comments }) => {
  const queryClient = useQueryClient()

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: data => {
      queryClient.invalidateQueries(["getCommentsQuery", postid], {exact:true})
      console.log(comments)
    }
  })

  function deleteCommentHandler() {
    deleteCommentMutation.mutate({
      userid: localStorage.getItem("userid"),
      commentid: commentid
    })
  }

  return (
    <div style={{ position: "relative" }} className='min-h-20 flex flex-row flex-wrap gap-2 bg-gray-700 mb-2 whitespace-normal p-2'>
      <section className='h-full w-full' style={{ wordWrap: "break-word" }}>{comment}</section>
      <section>by: {fullName}</section>
      {commenterid == localStorage.getItem("userid") &&
        <button onClick={deleteCommentHandler} id='commentDeleteButton' className='bg-[#cdd9ed] hover:bg-[#a1b0c9] text-[#4B5563] font-bold py-1 px-1 mr-1 mt-1 rounded'>Delete comment</button>
      }
    </div>
  )
}

export default Comment