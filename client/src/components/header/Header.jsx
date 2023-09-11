import React from 'react'
import './Header.css'

export default function Header() {
  return (
    <div className = "header">
      <div className = "headerTitles">
        <span className = "headerTitleSm">React & Node</span>
        <span className = "headerTitleLg">BLOG</span>
      </div>
      <img className = "headerImage" alt = "headerImage" src = "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80"/>
    </div>
  )
}
