import React from 'react'
import './Write.css'
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: title, // Use the state value for title
      desc: desc,   // Use the state value for desc
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  }

  // Update title and desc states with user input
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  }

  return (
    <div className="write">
      <div className='ImgWrapper'>
        {file &&
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        }
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor='fileInput'>
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" placeholder='Title' className='writeInput' autoFocus={true} value={title} onChange={handleTitleChange} />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder='Tell Your Story'
            type="text"
            className="writeInput writeText"
            value={desc} // Use the state value for desc
            onChange={handleDescChange} // Update the state when user enters input
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">publish</button>
      </form>
    </div>
  )
}

