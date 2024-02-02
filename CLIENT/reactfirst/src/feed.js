import React from 'react';
import ResponsiveAppBar from './ResponsiveAppbar';
import './feed.css' ;
import { StyledEngineProvider } from '@mui/material/styles';

<React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ResponsiveAppBar/>
    </StyledEngineProvider>
  </React.StrictMode>


function feed() {
  return (
    <>
    <h1>hello</h1>
    <div className='appbar'>
    <ResponsiveAppBar/>
    </div>
    </>
  )
}

export default feed
