import React, { useState } from 'react';
import Login from "./Login";
import Header from './Header';
import HeroSection from './HeroSection';
import Categories from './Categories';
import Footer from './Footer';
import './Home.css';
import SignupForm from './SignupForm';

function Home() {

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

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
        <Categories />
        <Footer />
    </div>
  );
}

export default Home;

