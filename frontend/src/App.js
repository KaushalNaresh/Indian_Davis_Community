import React, { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import Categories from './Categories';
import Footer from './Footer';
import SignupForm from './SignupForm'; // Import the SignupForm component
import './App.css';

function App() {
  const [showSignup, setShowSignup] = useState(false);

  const handleJoinClick = () => {
    setShowSignup(true);
  };

  return (
    <div className="App">
      {showSignup ? (
        <SignupForm showSignup={setShowSignup}/>
      ) : (
        <>
          <Header />
          <HeroSection  onJoinClick={handleJoinClick}/>
          <Categories />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

