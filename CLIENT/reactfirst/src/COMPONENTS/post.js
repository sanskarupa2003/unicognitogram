import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import avt from '../avt.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import axios from 'axios';
import './post.css'

function Post() {
  const [liked, setLiked] = useState(false);
  const [responseData, setResponseData] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/home/feed');
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      setResponseData(response.data.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <div className='coll1'>
        <div className='post1'>
          <Avatar alt="Remy Sharp" src={avt} sx={{ mr: 1.5, width: 40, height: 40 }} />
          <p>Username</p>
        </div>
        <div className='content'>
          {responseData && (
            <div>
              <p>{responseData}</p>
            </div>
          )}
        </div>
        <div className='like' onClick={handleLikeClick}>
          {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
        </div>
      </div>
    </>
  );
}

export default Post;
