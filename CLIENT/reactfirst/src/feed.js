import React from 'react';
import Header from './COMPONENTS/header';
import './feed.css' 
import Mfeed from './COMPONENTS/mfeed';

// import KeepMountedModal from './COMPONENTS/KeepMountedModal';
function feed() {
  return (
    <>
    <Header/>
    <div className='coll'>
    
    <div className='group'>
      <div className='mainfeed'>
      <Mfeed/>
      </div>
    </div>
    </div>
    </>
  )
}

export default feed
