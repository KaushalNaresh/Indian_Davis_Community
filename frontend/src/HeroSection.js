
import React, { useContext, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './HeroSection.css'; // Link to the CSS file
import { AuthContext } from './AuthContext';
import SignupForm from './SignupForm';
import LoginForm from './Login';
import Carousel from './Carousel';
import FriendsImg1 from './images/FriendsImg1.jpg';
import FriendsImg2 from './images/FriendsImg2.jpg';
import FriendsImg3 from './images/FriendsImg3.jpg';
import FriendsImg4 from './images/FriendsImg4.jpg';

const images = [FriendsImg1, FriendsImg2, FriendsImg3, FriendsImg4];

function HeroSection({ showSignUp, setShowSignUp, showLogIn, setShowLogIn }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const typedRef = useRef(null);

  useEffect(() => {
    const typedOptions = {
      strings: [
        'Infinite possibilities.',
        'Infinite memories.',
        'Infinite friendships.',
        'Infinite opportunities.'
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false,
      cursorChar: '|',
      contentType: 'html',
    };

    const typed = new Typed(typedRef.current, typedOptions);

    return () => typed.destroy();
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content">
        {showSignUp ? (
          <SignupForm setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp} />
        ) : showLogIn ? (
          <LoginForm setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp} />
        ) : (
          <>
            {isLoggedIn && <h2>Hi, {user.firstName}!</h2>}
            <h1>Connect. Inspire. <span className="highlight">Belong.</span></h1>
            <p>One community. <span ref={typedRef} className="phighlight">Infinite possibilities.</span></p>
            <p>Join the Davis Desi Family!</p>
            {!isLoggedIn && (
              <button className="join-button" onClick={() => setShowSignUp(true)}>Join ICD</button>
            )}
          </>
        )}
      </div>
      <Carousel slides= {images} />
    </div>
  );
}

export default HeroSection;
