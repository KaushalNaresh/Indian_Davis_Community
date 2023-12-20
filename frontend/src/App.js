import React, { useState } from 'react';
import Login from "./Login";
import Home from "./Home";
import SignupForm from './SignupForm'; // Import the SignupForm component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignupForm />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;