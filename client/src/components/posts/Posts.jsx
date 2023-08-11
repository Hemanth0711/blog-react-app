import React from 'react'
import './Posts.css'
import Post from '../post/Post'

export default function Posts({posts}) {
  console.log(posts);
  return (
    <div className = "posts">
      {
        posts.map((post) => (
          <Post key = {post._id} post = {post} />
        ))
      }
    </div>
  )
}
