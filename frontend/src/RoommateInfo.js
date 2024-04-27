import React, { useState, useEffect } from 'react';
import './RoommateInfo.css';
import backgroundImage from './images/RoomatesInfo.jpg'; // Adjust the import path if needed

const RoommateInfo = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const content = document.querySelector('.roommate-info-content');
            if (content) {
                const contentPosition = content.getBoundingClientRect().top;
                const screenPosition = window.innerHeight;

                setIsVisible(contentPosition < screenPosition && contentPosition > 0);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <section className="roommate-info-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="roommate-info-overlay"></div>
        <div className={`roommate-info-content ${isVisible ? 'visible' : ''}`}>
          <h2>Discover the Perfect Roommate</h2>
          <p>
            Whether you're looking for someone to join your flat or seeking a new place to call home, our platform connects you with compatible roommates. Our vibrant community ensures you find the right match for your lifestyle and preferences.
          </p>
        </div>
      </section>
    );
};

export default RoommateInfo;
