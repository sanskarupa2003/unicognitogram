import React from 'react'
import l from '../logow.png'
import './hwl.css'
import { NavLink } from 'react-router-dom';
function hwl() {
    return (
      <>
        <div className='containerr'>
        <div className='wraps'>
            <div className='element'>
              <div>
                <img src={l} className="l" alt="" />
              </div>
              <NavLink to="/home">
              <div className="t2">
                <p style={{ color: '#FFFFFF', fontFamily: 'Playfair Display' }}>UNICOGNITO</p>
              </div>
              </NavLink>
            </div>
            
          </div>

        </div>
      </>
    );
  }
  
  export default hwl;