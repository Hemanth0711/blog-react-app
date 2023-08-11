import React from 'react'
import './Post.css'
import {Link} from "react-router-dom"

export default function Post({post}) {
  const PF = "http://localhost:3000/images/";
  console.log("photo name:", post.photo);
  return (
    <div className = "post">
        {
          post.photo &&
          (<img className = "postImg" 
          src = {PF + post.photo}
          alt = ""/>)
        }
        <div className="postInfo">
            <div className="postCats">
                {
                  post.categories.map((category) => (
                    <span className='postCat'>{category.name}</span>
                  ))
                }
            </div>
            <Link to = {`/post/${post._id}`} className = "link">
              <span className="postTitle">{post.title}</span>
            </Link>
            <hr/>
            <span className="postDate">{new Date(post.createdAt).toDateString}</span>
            <span className="postDisc">{post.desc}</span>
        </div>

      
    </div>
  )
}
