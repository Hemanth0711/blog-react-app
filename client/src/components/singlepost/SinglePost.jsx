import React from 'react'
import './SinglePost.css'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { useContext } from 'react'

export default function SinglePost() {
  const location = useLocation();
  const PF = "http://localhost:3000/images/";
  const split_arr = location.pathname.split("/");
  const path = split_arr[split_arr.length-1];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editMode, setEditMode] = useState(false);
  const {user} = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  
  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${post._id}`, {data: {username: user.username}});
      window.location.replace("/");
    }catch(err){}
  };

  const handleUpdate = async () => {
    try{
      await axios.post(`/posts/${post._id}`, {username: user.username, title, desc});
      setEditMode(false);
    }catch(err){}
  }

  return (
    <div className = "singlepost">
      <div className="singlepostWrapper">
          {
            post.photo &&
            (
              <img className = "singlepostImg" src = {PF + post.photo} alt = ""/>
            )
          }
        
            {
              editMode ? <input value={title} type = "text" onChange = {(e) => setTitle(e.target.value)} className = "singlepostTitleInput" autoFocus="true"/> :
              <h1 className="singlepostTitle">{title}
                {post.username === user?.username && (<div className = "singlepostIcons">
                    <i class="edit fa-solid fa-pen-to-square" onClick = {() => setEditMode(true)}></i>
                    <i class="delete fa-solid fa-trash" onClick = {handleDelete}></i>
                </div>)}
              </h1>
            }
            <div className="singlepostInfo">
                <span className="singpostAuthor">
                    Author:
                    <Link to = {`/?user=${post.username}`} className = "link">
                    <b>{post.username}</b>
                    </Link>
                </span>
                <span className="singlepostDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            {
              editMode? <input type = "text" className = "singlepostDescInput" value = {desc} onChange = {(e) => setDesc(e.target.value)}/> :
              <p className='singlepostDisc'>
                {desc}
              </p>
            }
            {
              editMode && <button className="singlepostUpdateButton" onClick = {handleUpdate}>Update</button>
            }
      </div>
      
    </div>
  )
}
