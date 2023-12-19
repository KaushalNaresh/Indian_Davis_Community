// import React from 'react';
// import Header from './Header';
// import HeroSection from './HeroSection';
// import Categories from './Categories';
// import Footer from './Footer';

// import './App.css';

// function App() {
  

//   return (
//     <div className="App">
//       <Header />
//       <HeroSection />
//       <Categories />
//       <Footer />

//     </div>
//   );
// }

// export default App;
// App.js
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
        <SignupForm />
      ) : (
        <>
          <Header />
          <HeroSection  onJoinClick={handleJoinClick} />
          <Categories />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

