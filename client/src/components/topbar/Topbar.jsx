import React from 'react'
import './Topbar.css'
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:3000/images/";
  const handleLogout = (e) =>
  {
    dispatch({ type:"LOGOUT" });
  };
  return (
    <div className = "top">
      <div className="top--left">
        <i class="fa-brands fa-square-twitter"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-pinterest"></i>
      </div>
      <div className="top--center">
        <ul className = "top-list">
          <li className='topListItem'><Link className = "link" to = '/'>HOME</Link></li> 
          <li className='topListItem'><Link className = "link" to = '/about'>ABOUT</Link></li>         
          <li className='topListItem'><Link className = "link" to = '/contact'>CONTACT</Link></li> 
          <li className='topListItem'><Link className = "link" to = '/write'>WRITE</Link></li> 
          <li className='topListItem' onClick = {handleLogout} >{user && "LOGOUT"}</li>  
        </ul>
      </div>
      <div className="top--right">
        {
          user ? 
          <div className="image-container">
            <Link to = "/settings">
              <img className="top-image" src={PF + user.profilePic} alt=""/>
            </Link>
          </div> :
          <ul className="top-list">
            <li className = "topListItem"><Link className = "link" to = '/login'>LOGIN</Link></li>
            <li className = "topListItem"><Link className = "link" to = '/register'>REGISTER</Link></li>
          </ul>

        }
        <div className="svg-container">
          <svg class="top-search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

    </div>
  )
}
