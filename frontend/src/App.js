import React, { useState } from 'react';
import Login from "./Login";
import Home from "./Home";
import SignupForm from './SignupForm'; 
import RoommateFinder from "./RoommateFinder";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function App() {

  const {isLoggedIn} = useContext(AuthContext);

  return (
    
      <div className="App">
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/roommate-finder" element={isLoggedIn ? <RoommateFinder /> : <Navigate to="/"/>}/>
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;