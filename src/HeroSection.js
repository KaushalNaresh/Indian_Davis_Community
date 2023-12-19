import React from 'react';
import './HeroSection.css'; // Link to the CSS file
import heroImage from "./images/HeroImage.jpg"

function HeroSection() {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Find your Desi family at UC Davis together</h1>
                <p>One community infinite possibilities</p>
                <button className="join-button">Join ICD</button>
            </div>
            <div className='hero-image'>
                <img src={heroImage} />
            </div>
        </div>
)};

export default HeroSection;
