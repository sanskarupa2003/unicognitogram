import logo from './logow.png';
import rect from './Rectangle-5.svg';
import arro from './Arrow1.svg';
import './App.css';
function App() {
  return (
    
    <>
    <div className="container" style={{ backgroundColor: '#000504' }}>
    <div className="text">
    <h3 style={{ color: '#F53816', fontFamily: 'Praise' }}>You have gone Unicognito</h3>
    <h1 style={{ color: '#FFFFFF', fontFamily: 'Playfair Display' }}>UNICOGNITO</h1>
    </div>
    
    
    
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    </div>
    <a href="http://localhost:3000/home/feed" target="_blank" rel="noopener noreferrer">
        <button className='btn' >
        <img className='rec' alt="" src={rect}/>
        <div className='laun' style={{ color: '#FFFFFF', fontFamily: 'Hammersmith One' }}>LAUNCH</div>
        <img className='arrow' alt="" src={arro} />
        </button>
    </a>  
    </>
  );
}


export default App;
