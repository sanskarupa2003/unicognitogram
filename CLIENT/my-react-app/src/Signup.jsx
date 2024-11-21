import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Signup.css';
import Hwl from './COMPONENTS/hwl';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear error when user starts typing
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/home/signup`, 
                formData
            );

            // Check for success flag in response
            if (response.data.success) {
                // Show success message or redirect to signin
                alert('Account created successfully! Please sign in.');
                navigate('/home/signin');
            } else {
                // Handle unsuccessful response
                setError(response.data.message || 'Signup failed');
            }
        } catch (error) {
            // Handle network or server errors
            console.error('Error signing up:', error);
            setError(
                error.response?.data?.message || 
                'An error occurred during signup. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <>
            <Hwl/>
            <div className='cont'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign up</h1>
                        <div className='acc'>
                            <h4>Have an account?</h4>
                            <NavLink to="/home/signin">
                                <h4 style={{color:'#F53816'}}>Sign In</h4>
                            </NavLink>
                        </div> 
                        
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

                        <div className="input-box">
                            <h5>Enter Your Email Address</h5>
                            <input 
                                type='email' 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder='Email address' 
                                required 
                            />
                        </div>
                        <div className="input-box">
                            <h5>Enter Your Username</h5>
                            <input 
                                type='text' 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                placeholder='Username' 
                                required 
                            />
                        </div>
                        <div className="input-box">
                            <h5>Enter Your Password</h5>
                            <input 
                                type='password' 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder='Password' 
                                required 
                            />
                        </div>
                        <button 
                            type='submit' 
                            disabled={isLoading}
                        >
                            {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;