import React from 'react';
import Header from './COMPONENTS/header';
import './feed.css' 
import OutlinedCard from './COMPONENTS/OutlinedCard';
import Mfeed from './COMPONENTS/mfeed';
function feed() {
  return (
    <>
    <Header/>
    <div className='coll'>
    
    <div className='group'>
      <div className='pro'>
      <OutlinedCard/>
      </div>
      <div className='mainfeed'>
      <Mfeed/>
      </div>
    </div>
    </div>
    </>
  )
}

export default feed
