import React, { useState } from 'react';
import Login from "./Login";
import Home from "./Home";
import SignupForm from './SignupForm'; 
import RoommateFinder from "./RoommateFinder";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { AuthProvider } from './AuthProvider';
import './App.css';

function App() {

  const {isLoggedIn, setIsLoggedIn} = useState(false);

  return (
    <AuthProvider >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/roommate-finder" element={<RoommateFinder />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;