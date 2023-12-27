import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import Categories from './Categories'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router'
import FilterBar from './FilterBar'
import './RoommateFinder.css'

function RoommateFinder() {

  const {isLoggedIn} = useContext(AuthContext);
//   const [roommates, setRoommates] = useState([]);
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
            <Categories/>
            <div className="banner">
                <HeroSection screen='roommate'/>
            </div>
            <FilterBar />
            <div className='roommate-finder-rows'>
                {/* {roommates.map(
                    rommate => {

                    }
                )} */}
            </div>
        </div>
  )
};

export default RoommateFinder