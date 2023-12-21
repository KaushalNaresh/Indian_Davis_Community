// LogInForm.js
import React, { useState, useContext } from 'react';
import './Login.css'; 
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const BASE_URL = "http://localhost:3001/api";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setUserDetails } = useContext(AuthContext);
  const validator = require("validator");

  const navigate = useNavigate();

  const fetchDetails = async function(){
    try {
        const response = await fetch(`${BASE_URL}/user/details?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const userDetails = await response.json();
      if (!response.ok) 
        throw new Error(userDetails.message);

      setUserDetails(userDetails);
   } 
   catch (error) {
      console.log(error.message);
   };

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!email || !password) 
          throw new Error('Please enter all the fields!');
          const response = await fetch(`${BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const errorResponse = await response.json();
        if (!response.ok) {
          setError(errorResponse.message)
          throw new Error(errorResponse.message);
        }; 

        login();
        fetchDetails();
        navigate("/");
     } 
     catch (error) {
      setError(error.message);
    };
    
  };

  return (
    <div className='login'>
        <div className="login-form">
        <h2>LogIn</h2>
        <form onSubmit={handleSubmit}>

            <label>
            UC Davis Email:
            <input placeholder="Enter your Email ID" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
            Password:
            <input placeholder="Enter your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            {error && <div className="error">{error}</div>}
            <button type="submit">LogIn</button>
        </form>
        <Link to="/signup">SignUp</Link>
        </div>
    </div>
  );
};

export default LoginForm;