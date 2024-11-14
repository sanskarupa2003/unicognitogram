import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './COMPONENTS/header';
import Mfeed from './COMPONENTS/mfeed';
import './feed.css';

function Feed() {
    const [feedData, setFeedData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/home/signin');
                return;
            }

            try {
                const response = await axios.get('https://unicognitogram.onrender.com/home/feed', {
                    headers: {
                        'Authorization': token
                    }
                });
                setFeedData(response.data.data);
            } catch (error) {
                console.error('Error fetching feed:', error);
                if (error.response && error.response.status === 401) {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    navigate('/home/signin');
                }
            }
        };

        fetchFeedData();
    }, [navigate]);

    return (
        <>
            <Header />
            <div className='coll'>
                <div className='group'>
                    <div className='mainfeed'>
                        <Mfeed data={feedData} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feed;

