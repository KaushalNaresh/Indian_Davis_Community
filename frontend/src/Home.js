import React, { useState, useContext } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Categories from './Categories';
import Carousel from './Carousel';
import Footer from './Footer';
import './Home.css';
import RoommateInfo from './RoommateInfo';
import { AuthContext } from './AuthContext';


function Home() {

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const {isLoggedIn, user} = useContext(AuthContext)

  return (
    <div className="home">
        <Header 
          setShowLogIn={setShowLogIn}
          setShowSignUp={setShowSignUp}
        />
        <HeroSection 
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          showLogIn={showLogIn}
          setShowLogIn={setShowLogIn}
        />
        <RoommateInfo />  
        <Footer /> 
    </div>
  );
}

export default Home;

