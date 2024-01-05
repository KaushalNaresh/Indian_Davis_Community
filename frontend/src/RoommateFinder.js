import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import Categories from './Categories'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router'
import FilterBar from './FilterBar'
import './RoommateFinder.css'
import RoommateFinderRow from './RoommateFinderRow'

function RoommateFinder() {

  const {isLoggedIn, user} = useContext(AuthContext);
  const [roommates, setRoommates] = useState([]);
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
            <FilterBar setRoommates={setRoommates}/>
            <div className='roommate-finder-rows'>
                {user.lookingForRoommate === "1" ?
                    roommates.map(
                        (roommate, i) => ((roommate.email !== user.email && roommate.lookingForRoommate === "1") ?
                            <RoommateFinderRow key={i} roommate={roommate}/> :
                            <></>        
                        )
                    ) :
                <div className='not-looking-for-roommate'>You have selected that you are not looking for roommates, update your choice in your profile page to see available students.</div>
            }
            </div>
        </div>
  )
};

export default RoommateFinder