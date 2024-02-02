import './Signin.css';

function Signin() {
    return(
        <>
        <div className='wrapper'>
            <form action="">
                <h1>Sign in</h1>
                <div className = 'acc'>
                    <h4>New User?</h4>
                    <a href="http://localhost:3000/home/signup" target="_blank" rel="noopener noreferrer">
                    <h4 style={{color:'#F53816'}}>Sign Up</h4>
                    </a>
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
                
                <button type='submit'>SIGN IN</button>
            </form>
        </div>
        </>
    );
}

export default Signin