import React, { useState, useEffect } from 'react';
import './mfeed.css';
import Avatar from '@mui/material/Avatar';
import avt from '../avt.png';
import Post from './post';
import axios from 'axios';

function Mfeed({ data }) {
    const [inputData, setInputData] = useState('');
    const [posts, setPosts] = useState(data || []);

    const handlePost = async () => {
        if (!inputData) {
            console.error('Input cannot be empty');
            return; // Early return if inputData is empty
        }

        try {
            const token = localStorage.getItem('token');

            // Make a POST request to create a new post
            const response = await axios.post('http://localhost:8000/home/feed', { data: inputData }, {
                headers: {
                    'Authorization': token // Ensure you send the token to authenticate
                }
            });

            if (response.status === 201) {
                // Assuming your server returns the newly created post
                const newPost = response.data.data;

                // Add the new post to the posts array
                setPosts(prevPosts => [...prevPosts, newPost]);

                setInputData(''); // Clear input after posting
            } else {
                console.error('Failed to create post:', response);
            }
        } catch (error) {
            console.error('There was an error!', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='groupsss'>
            <div className="postbox">
                <Avatar alt="Remy Sharp" src={avt} sx={{ width: 40, height: 40 }} />
                <input
                    id='input'
                    type='text'
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Write Something'
                />
                <button type='submit' onClick={handlePost} className='postbutton'>Post</button>
            </div>

            <div className='posts'>
                {posts.map(post => (
                    <Post key={post._id} data={post.content} /> // Use post._id and post.content if that's how your Post component is structured
                ))}
            </div>
        </div>
    );
}

export default Mfeed;

