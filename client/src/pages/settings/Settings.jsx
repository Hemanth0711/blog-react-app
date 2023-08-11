import React from 'react'
import './Settings.css'
import SideBar from '../../components/sidebar/Sidebar'
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const PF = "http://localhost:3000/images/";
  const {user, dispatch} = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"});
    if(username.length === 0 || email.length === 0 || password.length === 0){
      alert("Required fields are empty...", 2000);
      return;
    }

    const updatedUser = {
      userId: user._id,
      username, email, password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }
    try {
      console.log(updatedUser);
      const res = await axios.put(`/users/${user._id}`, updatedUser);
      if( res.status === 200){
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({type: "UPDATE_SUCCESS", payload: res.data});
        setUpdated(true);
      }
    } catch (err) {
      dispatch({type: "UPDATE_FAILURE"});
      console.error("Error updating user:", err);
    }
  }


  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle">Delete Your Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
                <img src = {file ? URL.createObjectURL(file) : PF + user.profilePic} alt = ""/>
                <label htmlFor = 'fileInput'>
                    <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input type = "file" id = 'fileInput' style={{display: 'none'}} onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <label>Username</label>
            <input type = "text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
            <label>Email</label>
            <input type = "email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type = "password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="settingsSubmit" type='submit'>Update</button>
            {updated && <span style = {{"color":"green" }}>Profile has been updated...</span>}
        </form>
      </div>
      <SideBar />
    </div>
  )
}
