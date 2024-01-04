import React, { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Comment } from './Comment'
import { createComment, getComments } from '../api/posts'


const CommentSection = ({ commentsShow, postid, setNumberOfComments }) => {
    const [comment, setComment] = useState("")
    const [commenterid, setCommenterid] = useState(JSON.parse(localStorage.getItem("userid")));

    const queryClient = useQueryClient()

    const getCommentsQuery = useQuery({
        queryKey: ["getCommentsQuery", postid],
        queryFn: async () => {
          const data = await getComments(postid)
          setNumberOfComments(data.length);
          return data;
        },
      })

    const postComment = useMutation({
        mutationFn: createComment,
        onSuccess: data => {
            console.log(data)
            queryClient.invalidateQueries(["getCommentsQuery", postid], { exact: true })

            //I couldnt get mutate to work if the entries were empty from the begninning so this is bandaid solution. 
            if(getCommentsQuery.data == undefined){
                queryClient.setQueryData(["getCommentsQuery", postid], [{comment: comment, fullName: JSON.parse(localStorage.getItem("fullName"))}])
                setNumberOfComments(1)
                console.log(getCommentsQuery.data)

            }
        }
    })

    const submit = async event => {

        event.preventDefault()

        const body = {
            "comment": comment,
            "commenterid": commenterid, 
            "postid": postid
        }

        postComment.mutate({
            body: body
        })
    }


    return (
        <>
            <div id='container' className='flex flex-col' style={{ display: commentsShow ? "flex" : "none" }}>
                <div id='commentContainer' className='bg-gray-700'>
                    <form onSubmit={submit}>
                        <textarea id='commentTextArea' onChange={e => setComment(e.target.value)} rows="4" className="block resize-none p-2.5 w-3/4 h-30 text-l text-gray-900 bg-gray-500 border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Give your comment to the post ..."></textarea>
                        <button type='submit' className="bg-[#cdd9ed] hover:bg-[#a1b0c9] text-[#4B5563] font-bold py-2 px-4 rounded w-1/4" id='textAreaButton'>Submit</button>
                    </form>
                </div>

                <div className='text-wrap flex flex-col min-h-20 bg-gray-800 text-white p-2'>
                    {getCommentsQuery.data?.map((e) => {
                        return <Comment comment={e.comment} fullName={e.fullName} />
                    })}
                </div>
            </div>

        </>


    )
}

export default CommentSection