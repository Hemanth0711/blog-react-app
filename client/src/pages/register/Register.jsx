import React from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import {api} from "../../utils/utils.js"
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post(api+"/auth/register", {
        username : username,
        email: email,
        password: password
      });
      res.data && window.location.replace("/login");
    }catch(err){
      setError(true);
    }
  }
  return (
    <div className='register'>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label> User Name</label>
        <input type = "text" placeholder='Enter your Username..' className='registerInput' onChange={e => setUsername(e.target.value)}/>
        <label> Email</label>
        <input type = "email" placeholder='Enter your email' className='registerInput' onChange={e => setEmail(e.target.value)}/>
        <label> Password</label>
        <input type = "password" placeholder='Enter your password' className='registerInput' onChange={e => setPassword(e.target.value)}/>
        
        <button className='registerButton' >register</button>
      </form>
      {error && <span style={{color: "red"}}>something went wrong!</span>}
      <button className='registerLoginButton'>
      <Link className = "link" to = "/login">Login</Link>
      </button>
    </div>
  )
}
