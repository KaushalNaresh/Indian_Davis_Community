// SignupForm.js
import React, { useState } from 'react';
import './SignupForm.css'; // Make sure you have the corresponding CSS file

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ucDavisId, setUcDavisId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@ucdavis\.edu$/i.test(email)) {
      setError('Please enter a valid UC Davis email address.');
      return;
    }
    // Add more validation as necessary for password and UC Davis ID

    // If all validations pass, submit the form data
    console.log('Form submitted', { email, password, ucDavisId });
    // Here you would typically send the data to the server
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
