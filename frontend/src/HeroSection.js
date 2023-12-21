import React, { useContext } from 'react';
import './HeroSection.css'; // Link to the CSS file
import heroImage from "./images/HeroImage.jpg"
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function HeroSection() {

    const {isLoggedIn, user} = useContext(AuthContext);

    return (
        <div className="hero-section">
            <div className="hero-content">
                {
                    isLoggedIn ? <h2>Hi, {user.name}!</h2> : <></>
                }
                <h1>Find your Desi family at UC Davis together</h1>
                <p>One community infinite possibilities</p>
                {isLoggedIn ?
                    <></>:
                    <Link className="join-button" to="/signup">Join ICD</Link>
                }
                <h1 className='acronym'><span>Indian</span> <span>Community</span> <span> @ Davis</span></h1>
            </div>
            <div className='hero-image'>
                <img src={heroImage} />
            </div>
        </div>
)};

export default HeroSection;