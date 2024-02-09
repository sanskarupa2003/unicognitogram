import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Signup from './Signup';
import Signin from './Signin';
import Feed from './feed'
import reportWebVitals from './reportWebVitals';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  
  <BrowserRouter>
  <Routes>
    <Route path="/home" element={<App />}/>
    <Route path="/home/signup" element={<Signup/>}/>
    <Route path="/home/signin" element={<Signin/>}/>
    <Route path="/home/feed" element={<Feed/>}/>
    <Route path="/*" element={<h1 style={{ color: '#FFFFFF'}}>Go to /home</h1> }/>
    
  </Routes>
  </BrowserRouter>
  </>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
