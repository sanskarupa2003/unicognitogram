import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import avt from '../avt.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import axios from 'axios';
import './post.css';

function Post() {
  const [liked, setLiked] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [likes, setLikes] = useState(0);

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

  const fetchLikes = () => {
    // Simulating fetching likes from an API
    // In a real application, you'd replace this with an actual API call
    // Here we just simulate an increment for demonstration purposes
    setTimeout(() => {
      setLikes(0); // Simulated likes count
    }, 1000); // Simulating a delay for fetching data
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  const handleLikeClick = () => {
    if (liked) {
      setLikes(likes - 1); // Decrease like count if unliked
    } else {
      setLikes(likes + 1); // Increase like count if liked
    }
    setLiked(!liked); // Toggle liked state
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
          <p>{likes} {likes === 1 ? 'like' : 'likes'}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
