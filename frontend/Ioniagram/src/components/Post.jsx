import React from 'react'

const Post = ({ caption, imageName }) => {
  return (
    <>
      <div className='bg-blue-900'>
        <h1>{imageName}</h1>
        <p>{caption}</p>
      </div>
    </>
  )
}

export default Post