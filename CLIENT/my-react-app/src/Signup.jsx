import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Signup.css';
import Hwl from './COMPONENTS/hwl';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/home/signup', formData);
            console.log(response.data); // Log the response from the backend
            setFormData('');
            
            // Optionally, you can navigate to another page or show a success message here
        } catch (error) {
            console.error('Error signing up:', error);
            // Optionally, you can show an error message to the user
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
                        <div className="input-box">
                            <h5>Enter Your Email Address</h5>
                            <input 
                                type='text' 
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
                        <button type='submit'>SIGN UP</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;

