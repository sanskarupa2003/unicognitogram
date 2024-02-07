import React, { useState} from 'react';
import './mfeed.css';
import Avatar from '@mui/material/Avatar';
import avt from '../avt.png';
import Post from './post';
import axios from 'axios';

function Mfeed({ onResponseReceived = () => {} }) {
  // Using useState to manage input data state
  const [inputData, setInputData] = useState('');

  // Using useReducer if the state logic becomes more complex
  // const [inputData, setInputData] = useReducer((state, action) => {
  //   switch (action.type) {
  //     case 'UPDATE_INPUT':
  //       return action.payload;
  //     default:
  //       return state;
  //   }
  // }, '');

  const handlePost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/home/feed', { data: inputData });
      
      if (response.status === 200) {
        onResponseReceived(response.data);
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
        <input id= 'input' type='text' value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder='Write Something'></input>
        <button type='submit' onClick={handlePost} className='postbutton'>Post</button>
      </div>
      <div className='posts'>
        <Post/>
      </div>
    </div>
  );
}

export default Mfeed;
