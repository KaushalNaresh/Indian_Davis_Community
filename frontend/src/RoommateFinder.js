import React, { useContext, useEffect } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import Categories from './Categories'
import './RoommateFinder.css'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router'

function RoommateFinder() {

  const {isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]); 

  if (!isLoggedIn) {
    return null; 
  }

  return (
        <div className="roommate-finder">
            <Header/>
            <div className="banner">
                <Categories/>
                <HeroSection screen='roommate'/>
            </div>
            <div className='roommate-finder-rows'>
                
            </div>
        </div>
  )
};

export default RoommateFinder