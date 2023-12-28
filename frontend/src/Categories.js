import React, { useContext } from 'react';
import './Categories.css'; // Make sure you link the CSS file for styling
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';

function Categories(){

    const navigate = useNavigate();

    const handleRoommateFinder = () => {
        navigate("/roommate-finder");
    }

    const {isLoggedIn} = useContext(AuthContext);
    
    return (
        <div className="categories">
            <div className={`category ${isLoggedIn ? "activate": "deactivate"}`} id="events">Events</div>
            <div className={`category ${isLoggedIn ? "activate": "deactivate"}`} id="housing">Housing</div>
            <div className={`category ${isLoggedIn ? "activate": "deactivate"}`} id="roommate-finder" onClick={() => handleRoommateFinder()}>Roommate Finder</div>
            <div className={`category ${isLoggedIn ? "activate": "deactivate"}`} id="popular-places">Popular Places</div>
            <div className={`category ${isLoggedIn ? "activate": "deactivate"}`} id="for-you">For You</div>
        </div>
)};

export default Categories;
