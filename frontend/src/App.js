import React, { useState } from 'react';
import Login from "./Login";
import Home from "./Home";
import SignupForm from './SignupForm'; 
import RoommateFinder from "./RoommateFinder";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import './App.css';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

function App() {

  const {isLoggedIn, setIsLoggedIn} = useState(false);
  // require('dotenv').config();

  return (
    <AuthProvider >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/roommate-finder" element={<RoommateFinder />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;