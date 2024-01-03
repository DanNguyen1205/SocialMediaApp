import React from 'react'

export const Comment = ({ comment, fullName }) => {
  return (
    <div className='min-h-20 flex flex-row flex-wrap gap-2 bg-gray-700 mb-2 whitespace-normal p-2'>
      <section className='h-full w-full' style={{wordWrap:"break-word"}}>{comment}</section>
      <section>by: {fullName}</section>
    </div>
  )
}

export default Comment