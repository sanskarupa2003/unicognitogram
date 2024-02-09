import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Signin.css';
import Hwl from './COMPONENTS/hwl';

function Signin() {
    const [formData, setFormData] = useState({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, for example, by sending the data to your backend
        console.log(formData);
        // Make sure to handle form submission logic here, e.g., sending a request to your backend
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
                        <NavLink to="/home/feed">
                            <button className='button0' type='submit'>SIGN IN</button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signin;
