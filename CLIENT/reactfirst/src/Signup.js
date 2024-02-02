import { NavLink } from 'react-router-dom';
import './Signup.css';

function Signup() {
    return(
        <>
        <div className='wrapper'>
            <form action="">
                <h1>Sign up</h1>
                <div className = 'acc'>
                    <h4>Have an account?</h4>
                    <NavLink to="/home/signin">
                    <h4 style={{color:'#F53816'}}>Sign In</h4>
                    </NavLink>
                </div> 
                <div className="input-box">
                    <input type='text' placeholder='Email address' required></input>
                </div>
                <div className="input-box">
                    <input type='text' placeholder='Username' required></input>
                </div>
                <div className="input-box">
                    <input type='text' placeholder='Password' required></input>
                </div>
                
                <button type='submit'>SIGN UP</button>
            </form>
        </div>
        </>
    );
}

export default Signup