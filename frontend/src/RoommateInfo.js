import React, { useState, useEffect, useContext } from 'react';
import './RoommateInfo.css';
import backgroundImage from './images/RoomatesInfo.jpg'; // Adjust the import path if needed
import { AuthContext } from './AuthContext';
import RoommatesCarousel from './RoommatesCarousel';
import { useNavigate } from 'react-router-dom'; 


const RoommateInfo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isLoggedIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleExploreMore = () => {
      navigate('/roommate-finder');
    };

    useEffect(() => {
        const handleScroll = () => {
            const content = document.querySelector('.roommate-info-content');
            if (content) {
                const contentPosition = content.getBoundingClientRect().top;
                const screenPosition = window.innerHeight;
                const offset = 800;

                setIsVisible(contentPosition < offset && contentPosition > 0);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <section className="roommate-info-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="roommate-info-overlay"></div>
        {isLoggedIn && <RoommatesCarousel/>}
        <div className='content-info'>
          <div className={`roommate-info-content ${isVisible ? 'visible' : ''}`}>
            <h2>Find My Roomie</h2>
            <p>
            {isLoggedIn ? "We strive to match you with roommates who tick all your boxes. If our suggestions haven't captured your interest, click 'Explore More' to delve into a wider pool of potential roommates"
                        : "Don't leave it to chance — your ideal roommate awaits! Connect with us to discover your perfect match and say goodbye to roommate roulette." 
            }
            </p>
            {isLoggedIn && <button onClick={handleExploreMore}>Explore More</button>}
          </div>
          <div className={`roommate-info-content ${isVisible ? 'visible' : ''}`}>
            <h2>Campus Happenings</h2>
            <p>
            {isLoggedIn ? "Not finding the event you're looking for? Step into a broader world of happenings around UC Davis or spark a new gathering by creating an event that brings people together."
                        : "No more dull moments! Dive into the fun side of UC Davis and find your next great experience. Connect, enjoy, and make every event your own."}
            </p>
            {isLoggedIn && <button>Explore & Create Events </button>}
          </div>
        </div>
      </section>
    );
};

export default RoommateInfo;
