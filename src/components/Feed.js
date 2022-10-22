import React from 'react'
import Post from './Post'

function Feed() {
  return (
    <div className='w-full flex flex-col space-y-5 mt-5 mb-10'>
      <Post
        photoURL='/story.jpg'
        username='username'
        caption="It's a good day"
        postPic='/postpic.jpg'
      />
      <Post
        photoURL='/story.jpg'
        username='username'
        caption="It's a good day"
        postPic='/postpic.jpg'
      />
      <Post
        photoURL='/story.jpg'
        username='username'
        caption="It's a good day"
        postPic='/postpic.jpg'
      />
      <Post
        photoURL='/story.jpg'
        username='username'
        caption="It's a good day"
        postPic='/postpic.jpg'
      />
    </div>
  )
}

export default Feed