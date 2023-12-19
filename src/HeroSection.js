// import React, { useState } from 'react'; // Import useState
// import './HeroSection.css'; // Link to the CSS file
// import heroImage from "./images/HeroImage.jpg";
// import SignupForm from './SignupForm';

// function HeroSection() {
//     const [showSignup, setShowSignup] = useState(false);

//     const handleJoinClick = () => {
//         setShowSignup(true);
//     };

//     return (
//         showSignup ? (
//             <SignupForm />
//         ) : (
//             <div className="hero-section">
//                 <div className="hero-content">
//                     <h1>Find your Desi family at UC Davis together</h1>
//                     <p>One community infinite possibilities</p>
//                     <button className="join-button" onClick={handleJoinClick}>Join ICD</button>
//                 </div>
//                 <div className="hero-image">
//                     <img src={heroImage} alt="UC Davis" />
//                 </div>
//             </div>
//         )
//     );
// }

// export default HeroSection;
import React from 'react';
import './HeroSection.css'; // Link to the CSS file
import heroImage from "./images/HeroImage.jpg"

function HeroSection({ onJoinClick }) {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Find your Desi family at UC Davis together</h1>
                <p>One community infinite possibilities</p>
                <button className="join-button" onClick={onJoinClick}>Join ICD</button>
                <h1 className='acronym'><span>Indian</span> <span>Community</span> <span> @ Davis</span></h1>
            </div>
            <div className='hero-image'>
                <img src={heroImage} />
            </div>
        </div>
)};

export default HeroSection;