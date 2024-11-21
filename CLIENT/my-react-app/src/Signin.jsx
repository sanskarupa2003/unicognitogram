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
                `${process.env.REACT_APP_API_URL}/home/signin`, 
                formData
            );

            // Check for success flag in response
            if (response.data.success) {
                // Store user information
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Optional: Store token if your backend provides one
                // localStorage.setItem('token', response.data.token);

                // Redirect to feed page
                navigate('/home/feed');
            } else {
                // Handle unsuccessful response
                setError(response.data.message || 'Sign in failed');
            }
        } catch (error) {
            // Handle network or server errors
            console.error('Error signing in:', error);
            setError(
                error.response?.data?.message || 
                'An error occurred during sign in. Please try again.'
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
                        <h1>Sign in</h1>
                        <div className='accc'>
                            <h4>New User?</h4>
                            <NavLink to="/home/signup">
                                <h4 style={{color:'#F53816'}}>Sign Up</h4>
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
                        <button 
                            type='submit' 
                            disabled={isLoading}
                        >
                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    ); 
}

export default Signin;