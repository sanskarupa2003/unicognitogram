import { NavLink } from 'react-router-dom';
import './Signin.css';
import Hwl from './COMPONENTS/hwl';
function Signin() {
    return(
        <>
        <Hwl/>
        <div className='cont'>
        <div className='wrapper'>
            <form action="">
                <h1>Sign in</h1>
                <div className = 'accc'>
                    <h4>New User?</h4>
                    <NavLink to="/home/signup" >
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
                <NavLink to="/home/feed" >
                <button type='submit'>SIGN IN</button>
                </NavLink>
            </form>
        </div>
        </div>
        </>
    );
}

export default Signin