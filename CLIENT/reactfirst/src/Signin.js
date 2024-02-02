import { NavLink } from 'react-router-dom';
import './Signin.css';

function Signin() {
    return(
        <>
        <div className='wrapper'>
            <form action="">
                <h1>Sign in</h1>
                <div className = 'accc'>
                    <h4>New User?</h4>
                    <NavLink to="http://localhost:3000/home/signup" >
                    <h4 style={{color:'#F53816'}}>Sign Up</h4>
                    </NavLink>
                </div> 
                {/* <div className="input-box">
                    <input type='text' placeholder='Email address' required></input>
                </div> */}
                <div className="input-box">
                    <input type='text' placeholder='Username' required></input>
                </div>
                <div className="input-box">
                    <input type='text' placeholder='Password' required></input>
                </div>
                <NavLink to="http://localhost:3000/home/feed" >
                <button type='submit'>SIGN IN</button>
                </NavLink>
            </form>
        </div>
        </>
    );
}

export default Signin