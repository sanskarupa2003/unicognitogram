import React, { useState, useEffect } from 'react';
import './mfeed.css';
import Avatar from '@mui/material/Avatar';
import avt from '../avt.png';
import Post from './post';
import axios from 'axios';

function Mfeed({ onResponseReceived = () => {} }) {
  const [inputData, setInputData] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/home/feed', { data: inputData });
      
      if (response.status === 200) {
        const newPost = {
          id: posts.length + 1, // Assigning a unique id to each post
          data: inputData
        };
        setPosts([...posts, newPost]); // Add the new post to the posts array
        setInputData(''); // Clear input after successful post
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className='groupsss'>
      <div className="postbox">
        <Avatar alt="Remy Sharp" src={avt} sx={{ width: 40, height: 40}} />
        <input id='input' type='text' value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder='Write Something'></input>
        <button type='submit' onClick={handlePost} className='postbutton'>Post</button>
      </div>
      <div className='posts'>
        {posts.map(post => (
          <Post key={post.id} data={post.data} />
        ))}
      </div>
    </div>
  );
}

export default Mfeed;
