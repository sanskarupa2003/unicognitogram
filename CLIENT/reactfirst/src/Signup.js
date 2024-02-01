import './Signup.css';

function Signup() {
    return(
        <>
        <div className='wrapper'>
            <form action="">
                <h1>Sign up</h1>
                <div className = 'acc'>
                    <h4>Have an account?</h4>
                    <a href="http://localhost:3000/home/signin" target="_blank" rel="noopener noreferrer">
                    <h4 style={{color:'#F53816'}}>Sign In</h4>
                    </a>
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