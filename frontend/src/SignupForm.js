// SignupForm.js
import React, { useState } from 'react';
import './SignupForm.css'; // Make sure you have the corresponding CSS file

const SignupForm = ({showSignup}) => {
  const BASE_URL = "http://localhost:3001/api";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ucDavisId, setUcDavisId] = useState('');
  const [error, setError] = useState('');
  const validator = require("validator");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter all the fields!');
      return;
    }
    if(!validator.isEmail(email)){
      setError("Please eneter correct email Id!");
      return;
    }
    if(!validator.isStrongPassword(password)){
      setError("Password not strong enough!");
      return;
    }

    // If all validations pass, submit the form data
    try {
        const response = await fetch(`${BASE_URL}/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, ucDavisId })
        });
        const errorResponse = await response.json();
        if (!response.ok) {
          setError(errorResponse.message)
          throw new Error(errorResponse.message);
        }; 
        showSignup(false);
     } 
     catch (error) {
      setError(error.message);
    };
    
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <label>
          UC Davis Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        {/* Password input */}
        <label>
          Create a Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {/* UC Davis ID input */}
        <label>
          UC Davis ID:
          <input type="text" value={ucDavisId} onChange={(e) => setUcDavisId(e.target.value)} required />
        </label>

        {/* Error message display */}
        {error && <div className="error">{error}</div>}

        {/* Submit button */}
        <button type="submit">Join ICD</button>
      </form>
    </div>
  );
};

export default SignupForm;
