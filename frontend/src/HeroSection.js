import React, { useContext, useState } from 'react';
import './HeroSection.css'; // Link to the CSS file
import heroImage from "./images/HeroImage.jpg"
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import SignupForm from './SignupForm';
import LoginForm from './Login';

function HeroSection({showSignUp, setShowSignUp, showLogIn, setShowLogIn}) {

    const {isLoggedIn, user} = useContext(AuthContext);
    // const [showSignUp, setShowSignUp] = useState(false);
    // const [showLogIn, setShowLogIn] = useState(false);

    return (
        <div className="hero-section">
            <div className="hero-content">
                { showSignUp ? <SignupForm setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp}/> :
                    (showLogIn ? <LoginForm setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp}/> :
                        <>
                            {
                                isLoggedIn ? <h2>Hi, {user.name}!</h2> : <></>
                            }
                            <h1>Find your Desi family at UC Davis together</h1>
                            <p>One community infinite possibilities</p>
                            {isLoggedIn ?
                                <></>:
                                <button className="join-button" onClick={() => setShowSignUp(true)}>Join ICD</button>
                            }
                            <h1 className='acronym'><span>Indian</span> <span>Community</span> <span> @ Davis</span></h1>
                        </>
                    )
                }
            </div>
            <div className='hero-image'>
                <img src={heroImage} />
            </div>
        </div>
)};

export default HeroSection;