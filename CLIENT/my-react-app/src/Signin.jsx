import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Signin.css';
import Hwl from './COMPONENTS/hwl';
import axios from 'axios';

function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://unicognitogram.onrender.com/home/signin', formData);
            console.log(response.data);
            
            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);
            
            // Redirect to the feed page
            navigate('/home/feed');
        } catch (error) {
            console.error('Error signing in:', error);
            setError(error.response?.data?.message || 'An error occurred during sign in');
        }
    };

    return(
        <>
            <Hwl/>
            <div className='cont'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign in</h1>
                        <div className='accc'>
                            <h4>New User?</h4>
                            <NavLink to="/home/signup">
                                <h4 style={{color:'#F53816'}}>Sign Up</h4>
                            </NavLink>
                        </div> 
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <div className="input-box">
                            <h5>Enter Your Email</h5>
                            <input 
                                type='email' 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder='Email' 
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
                        <button type='submit'>SIGN IN</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signin;