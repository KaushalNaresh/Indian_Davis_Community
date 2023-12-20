import React, { useState } from 'react';
import Login from "./Login";
import Header from './Header';
import HeroSection from './HeroSection';
import Categories from './Categories';
import Footer from './Footer';
import './Home.css';

function Home() {

  return (
    <div className="home">
        <Header />
        <HeroSection />
        <Categories />
        <Footer />
    </div>
  );
}

export default Home;

