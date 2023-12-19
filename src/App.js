import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import './App.css';

function App() {
  // The image is located in the public folder under images
  const heroImageUrl = '/HeroImage.jpg';

  return (
    <div className="App">
      <Header />
      <HeroSection backgroundImage={heroImageUrl} />
      <main>
        {/* Other content of your app */}
        <p>This is the main content of your app.</p>
      </main>
    </div>
  );
}

export default App;
