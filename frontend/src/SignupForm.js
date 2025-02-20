// SignupForm.js
import React, { useState, useContext } from 'react';
import './SignupForm.css'; 
import { useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';
import Constants from "./StringConstants.json"
import validator from 'validator';

function SignupForm({ setShowLogIn, setShowSignUp }) {
  const BASE_URL = Constants.base_url;
  const navigate = useNavigate();

  const { login, setUserDetails } = useContext(AuthContext);

  // -- Core Required Fields --
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [ucDavisId, setUcDavisId] = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error / Status
  const [error, setError] = useState('');

  // Fetch user details after successful signup & login
  const fetchDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/details?email=${email}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const userDetails = await response.json();

      if (!response.ok || userDetails.message !== 'OK') {
        throw new Error(userDetails.message || 'Failed to fetch user details.');
      }

      setUserDetails(userDetails.users[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // -- Basic validations for required fields --
      if (!firstName || !lastName || !email || !ucDavisId || !password || !confirmPassword) {
        throw new Error('Please fill out all required fields.');
      }
      if (!email.endsWith('@ucdavis.edu')) {
        throw new Error('Please use a valid @ucdavis.edu email.');
      }
      if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough! Use a mix of letters, numbers, etc.');
      }
      if (password !== confirmPassword) {
        throw new Error('Password and Confirm Password do not match!');
      }

      // -- Sign up request --
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          // Required fields
          firstName,
          lastName,
          email,
          password,
          ucDavisId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message);
      }

      // -- On successful signup --
      login();         // update AuthContext state as "logged in"
      await fetchDetails();
      moveToHome();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const moveToLogin = () => {
    setShowSignUp(false);
    setShowLogIn(true);
  };

  const moveToHome = () => {
    setShowSignUp(false);
    setShowLogIn(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Your Account</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <label>
              First Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>
              Last Name <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* UC Davis Email */}
          <div className="form-group">
            <label>
              UC Davis Email <span>*</span>
            </label>
            <input
              type="email"
              placeholder="name@ucdavis.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* UC Davis ID */}
          <div className="form-group">
            <label>
              UC Davis ID <span>*</span>
            </label>
            <input
              type="text"
              placeholder="E.g. 12345678"
              value={ucDavisId}
              onChange={(e) => setUcDavisId(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>
              Password <span>*</span>
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>
              Confirm Password <span>*</span>
            </label>
            <input
              type="password"
              placeholder="Re-type your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Join ICD
          </button>
        </form>

        {/* Footer: Login/Home buttons */}
        <div className="form-footer">
          <button onClick={moveToLogin} className="footer-link">
            Login
          </button>
          <button onClick={moveToHome} className="footer-link">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;