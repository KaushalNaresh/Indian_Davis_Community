// SignupForm.js
import React, { useState } from 'react';
import './SignupForm.css'; 
import {Link, useNavigate} from "react-router-dom";

const SignupForm = () => {
  const BASE_URL = "http://localhost:3001/api";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ucDavisId, setUcDavisId] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const validator = require("validator");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        if (!email || !password) 
          throw new Error('Please enter all the fields!');
        if(!validator.isStrongPassword(password))
          throw new Error("Password not strong enough!");
        // if(!validator.isEmail(email))
        //   throw new Error("Please eneter correct email Id!");
        

        const response = await fetch(`${BASE_URL}/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, ucDavisId })
        });
        const errorResponse = await response.json();
        if (!response.ok) {
          setError(errorResponse.message)
          throw new Error(errorResponse.message);
        }; 
        navigate("/home")
     } 
     catch (error) {
      setError(error.message);
    };
    
  };

  return (
    <div className='signup'>
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>

            <label>
              Full Name:
              <input placeholder="Enter your Name " type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              UC Davis Email:
              <input placeholder="Enter your Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              Create a Password:
              <input placeholder="Enter your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <label>
              UC Davis ID:
              <input placeholder = "Enter your UC Davis ID" type="text" value={ucDavisId} onChange={(e) => setUcDavisId(e.target.value)} />
            </label>

            {error && <div className="error">{error}</div>}

            <button type="submit">Join ICD</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>
  );
};

export default SignupForm;
