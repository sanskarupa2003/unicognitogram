import logo from './logow.png';
import rect from './Rectangle-5.svg';
import arro from './Arrow1.svg';
import './App.css';
import { NavLink } from 'react-router-dom';
import { motion } from "framer-motion";

function App() {
  return(
    <>
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
    <div className="text1">
    <p style={{ color: '#F53816', fontFamily: 'Praise' }}>You have gone Unicognito</p>
    </div>
    <div className="text2">
    <p style={{ color: '#FFFFFF', fontFamily: 'Playfair Display' }}>UNICOGNITO</p>
    </div>
    
        <div>
        <img src={logo} className="logoo" alt="logo" />
        </div>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.8,
        ease: [0.70, 1, 0.2, 1]
      }}
    >
    <div>
    <NavLink to="/home/signup">   
        <img className='rec' alt="" src={rect}/>
        <div className='laun' style={{ color: '#FFFFFF', fontFamily: 'Hammersmith One' }}>LAUNCH</div>
        <img className='arrow' alt="" src={arro} />
        
    </NavLink>  
    </div>
    </motion.div>
    </>
  );
}


export default App;
