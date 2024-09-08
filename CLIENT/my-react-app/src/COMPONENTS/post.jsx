import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import avt from '../avt.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import './post.css';

function Post({ data }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikes(prevLikes => liked ? prevLikes - 1 : prevLikes + 1);
    };

    return (
        <>
            <div className='coll1'>
                <div className='post1'>
                    <Avatar alt="Remy Sharp" src={avt} sx={{ mr: 1.5, width: 40, height: 40 }} />
                    <p>Username</p>
                </div>
                <div className='content'>
                    <p>{data}</p> {/* Displaying the post content directly */}
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
