import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './COMPONENTS/header';
import Mfeed from './COMPONENTS/mfeed';
import './feed.css';

function Feed() {
    const [feedData, setFeedData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/home/signin');
                return;
            }

            try {
                setIsLoading(true);
                setError('');

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/feed`, {
                    headers: {
                        'Authorization': token
                    }
                });

                // Check for success flag in response
                if (response.data.success) {
                    setFeedData(response.data.data || []);
                } else {
                    // Handle unsuccessful response
                    setError(response.data.message || 'Failed to fetch feed');
                }
            } catch (error) {
                console.error('Error fetching feed:', error);
                
                // Handle network or authentication errors
                if (error.response && error.response.status === 401) {
                    // Token is invalid or expired
                    localStorage.removeItem('token');
                    navigate('/home/signin');
                } else {
                    setError(
                        error.response?.data?.message || 
                        'An error occurred while fetching the feed. Please try again.'
                    );
                }
            } finally {
                setIsLoading(false);
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
                        {error && (
                            <div 
                                style={{
                                    color: 'red', 
                                    marginBottom: '15px', 
                                    textAlign: 'center'
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {isLoading ? (
                            <div style={{ textAlign: 'center' }}>Loading...</div>
                        ) : error ? null : (
                            <Mfeed data={feedData} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feed;