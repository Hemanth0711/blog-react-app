import React from 'react'
import './Sidebar.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { api } from "../../utils/utils.js"

export default function SideBar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async ()=> {
      const res = await axios.get(api+"/categories");
      setCats(res.data)
    };
    getCats();
  }, [])
  return (
    <div className = "sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">
          ABOUT ME
        </span>
        <img src = "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" alt = ""/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, illum exercitationem dolore pariatur nesciunt suscipit fugiat praesentium natus distinctio expedita optio excepturi dolor ab commodi, sapiente sunt debitis accusantium explicabo.</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
        <ul className="sidebarList">
          {cats.map((cat) => (
            <Link to={`/?cat=${cat.name}`} className="link" key={cat.name}>
              <li className="sidebarListItem">{cat.name}</li>
            </Link>
          ))}
        </ul>

        </span>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">
          FOLLOW US
        </span>
        <div className="sidebarSocial">
          <i class="sidebarIcon fa-brands fa-square-twitter"></i>
          <i class="sidebarIcon fa-brands fa-instagram"></i>
          <i class="sidebarIcon fa-brands fa-facebook"></i>
          <i class="sidebarIcon fa-brands fa-pinterest"></i>
        </div>
      </div>

    </div>
  )
}
