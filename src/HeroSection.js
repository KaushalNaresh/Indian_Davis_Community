import React from 'react';
import './HeroSection.css'; // Link to the CSS file

const HeroSection = ({ backgroundImage }) => (
    <div className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="hero-content">
            <h1>Banner with UCD ICD information</h1>
            <p>A little write-up about what the app is and any additional quirky things/info.</p>
            <button className="join-button">Join ICD</button>
        </div>
    </div>
);

export default HeroSection;
