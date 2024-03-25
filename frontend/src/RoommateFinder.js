import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import Categories from './Categories'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router'
import FilterBar from './FilterBar'
import './RoommateFinder.css'
import RoommateFinderRow from './RoommateFinderRow'
import Pagination from '@mui/material/Pagination';

function RoommateFinder() {

  const {isLoggedIn, user} = useContext(AuthContext);
  const [roommates, setRoommates] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [currPageId, setCurrPageId] = useState();
  const [prevPageNumber, setPrevPageNumber] = useState();
  const [currPageNumber, setCurrPageNumber] = useState(1);
  const [hideLastPage, setHideLastPage] = useState(false);
  

  const changePage = (value) => {
    setPrevPageNumber(currPageNumber);
    setCurrPageNumber(value);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    if(currPageNumber < totalPages - 3)
      setHideLastPage(true);
    else
      setHideLastPage(false);

  }, [currPageNumber, totalPages, isLoggedIn, navigate]); 

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
            <FilterBar 
                        setRoommates={setRoommates}
                        setTotalPages={setTotalPages}
                        setCurrPageId={setCurrPageId}
                        currPageId={currPageId}
                        setPrevPageNumber={setPrevPageNumber}
                        prevPageNumber={prevPageNumber}
                        setCurrPageNumber={setCurrPageNumber}
                        currPageNumber={currPageNumber}
            />
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
            <div className={`pagination ${hideLastPage ? 'hide-last-page' : ''}`}>
              <Pagination count={totalPages} variant="outlined" page={currPageNumber} shape="rounded" onChange={(e, value) => changePage(value)}/>
            </div>
        </div>
  )
};

export default RoommateFinder