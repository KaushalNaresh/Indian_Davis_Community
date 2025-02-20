import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Constants from './StringConstants.json';
import validator from 'validator'; // only if needed
import './Login.css'; // Import the matching CSS

function Login({ setShowLogIn, setShowSignUp }) {
  const BASE_URL = Constants.base_url;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch user details after successful login
  const fetchDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/details?email=${email}`, {
        method: 'POST',
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
      if (!email || !password) {
        throw new Error('Please enter all required fields!');
      }

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message);
      }

      login();
      await fetchDetails();

      moveToHome();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
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
    <div className="login-container">
      <div className="login-form">
        <h2>Log In</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>UC Davis Email:</label>
            <input
              type="email"
              placeholder="Enter your UC Davis email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Log In
          </button>
        </form>

        <div className="form-footer">
          <button onClick={moveToSignUp} className="footer-link">
            Sign Up
          </button>
          <button onClick={moveToHome} className="footer-link">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
