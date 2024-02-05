import React from 'react'
import './mfeed.css' 
import Avatar from '@mui/material/Avatar';
import avt from '../avt.jpg';
function mfeed() {
  return (
    <div>
    
    <div className="postbox">
    <Avatar alt="Remy Sharp" src={avt} sx={{ width: 40, height: 40}} />
    <input type='text' placeholder='Write Something'></input>
    <button className='postbutton'>Post</button>
    </div>
    
    </div>
  )
}

export default mfeed
