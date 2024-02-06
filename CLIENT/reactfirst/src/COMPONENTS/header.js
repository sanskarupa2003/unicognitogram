import React from 'react'
import l from '../logow.png'
import './header.css'
import { NavLink } from 'react-router-dom';
import AccountMenu from './AccountMenu';
function Header() {
    return (
      <>
        <div className='containerr'>
        <div className='wrap'>
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
            <div className='elemetn2'>
            {/* <NavLink to="/home">
            <button type='submit'>LOG OUT</button>
            </NavLink> */}
            <AccountMenu/>
            </div>
          </div>

        </div>
      </>
    );
  }
  
  export default Header;
