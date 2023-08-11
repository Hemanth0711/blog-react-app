import React from 'react'
import { useState, useEffect } from 'react'
import Header from "../../components/header/Header.jsx"
import Posts from "../../components/posts/Posts.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import './Home.css'
import axios from "axios"
import { useLocation } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts/"+search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  return (
    <div>
      <Header/>
      <div className = "home">
        <Posts posts = {posts}/>
        <Sidebar />
      </div>
    </div>
  )
}
