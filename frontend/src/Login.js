// LogInForm.js
import React, { useState, useContext } from 'react';
import './Login.css'; 
import {useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';
import Constants from "./StringConstants.json";

const LoginForm = ({setShowLogIn, setShowSignUp}) => {
  const BASE_URL = Constants.base_url;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user, setUserDetails } = useContext(AuthContext);
  const validator = require("validator");

  const navigate = useNavigate();

  const fetchDetails = async function(){
    try {
        const response = await fetch(`${BASE_URL}/user/details?email=${email}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });

      const userDetails = await response.json();
      if (userDetails.message != 'OK' || !response.ok) 
        throw new Error(userDetails.message);

      setUserDetails(userDetails.users[0]);
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
          credentials: 'include',
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
        moveToHome();
        navigate("/");
     } 
     catch (error) {
      setError(error.message);
    };
    
  };

  const moveToSignUp = () => {
    setShowLogIn(false);
    setShowSignUp(true);
  };

  const moveToHome = () => {
    setShowLogIn(false);
    setShowSignUp(false);
  };

  return (
    <div className='login'>
        <div className="login-form">
        <h2>LogIn</h2>
        <form onSubmit={handleSubmit}>

            <label>
            UC Davis Email:
            <input placeholder="Enter your UC Davis email ID" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
            Password:
            <input placeholder="Enter your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            {error && <div className="error">{error}</div>}
            <button type="submit">LogIn</button>
        </form>
        {/* <Link to="/signup">SignUp</Link> */}
        <div className='login-form-foot-buttons'>
          <a onClick={() => moveToSignUp()}>Sign Up</a>
          <a onClick={() => moveToHome()}>Home</a>
        </div>
        </div>
    </div>
  );
};

export default LoginForm;
