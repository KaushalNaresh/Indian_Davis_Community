// SignupForm.js
import React, { useState, useContext } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import './SignupForm.css'; 
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';

const SignupForm = ({setShowLogIn, setShowSignUp}) => {
  const BASE_URL = "http://localhost:3001/api";

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ucDavisId, setUcDavisId] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [major, setMajor] = useState('');
  const [degree, setDegree] = useState('');
  const [smoker, setSmoker] = useState('');
  const [drinker, setDrinker] = useState('');
  const [lookingForRoommate, setLookingForRoommate] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [socialMedia, setSocialMedia] = useState({ linkedIn: '', instagram: '', twitter: '' });
  const [aboutYou, setAboutYou] = useState('');
  const [error, setError] = useState('');
  const { login, setUserDetails } = useContext(AuthContext);

  const majorOptions = [
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'electrical_engineering', label: 'Electrical Engineering' },
    // ... other majors
  ];
  const degreeOptions = [
    { value: 'bachelors', label: "Bachelor's" },
    { value: 'masters', label: "Master's" },
    { value: 'phd', label: "PHD" },
    // ... other degrees
  ];

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
        if(!validator.isStrongPassword(password))
          throw new Error("Password not strong enough!");

        const response = await fetch(`${BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, ucDavisId })
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

  const moveToLogin = () => {
    setShowLogIn(true);
    setShowSignUp(false);
  };

  const moveToHome = () => {
    setShowLogIn(false);
    setShowSignUp(false);
  };

  return (
    <div className='signup'>
        <div className="signup-form">
          {/* <h2>Sign Up</h2> */}
          <form onSubmit={handleSubmit}>


          <div className="form-row">
            <div className="half-width-input">
              <label className="form-label">First Name</label>
              <input placeholder="Enter your first name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="half-width-input">
              <label className="form-label">Last Name</label>
              <input placeholder="Enter your last name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>


          <div className="form-row">
            <div className="half-width-input">
              <label className="form-label">Email</label>
              <input placeholder="Enter your uc davis email id" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="half-width-input">
              <label className="form-label">UC Davis ID</label>
              <input placeholder="Enter your uc davis student id" type="ucdavis-id" value={ucDavisId} onChange={(e) => setUcDavisId(e.target.value)} required />
            </div>
          </div>

          <div className="form-row">
            <div className="half-width-input">
              <label className="form-label">Password</label>
              <input placeholder="Create a password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="half-width-input">
              <label className="form-label">Confirm Password</label>
              <input placeholder="Confirm your password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          {/* Major and Degree Dropdowns */}
          <div className="select-group row">
              <div className="col">
                <label className="select-group-label">Major</label>
                <Select
                  options={majorOptions}
                  onChange={(selectedOption) => setMajor(selectedOption.value)}
                  placeholder="Select Major"
                  isSearchable
                  required
                />
              </div>
              <div className="col">
                <label className="select-group-label">Degree</label>
                <Select
                  options={degreeOptions}
                  onChange={(selectedOption) => setDegree(selectedOption.value)}
                  placeholder="Select Degree"
                  isSearchable
                  required
                />
              </div>
           </div>

            {/* Country and Region Dropdowns */}
            <div className="select-group row">
              <div className="col">
                <label className="select-group-label">Country</label>
                <CountryDropdown
                  value={country}
                  onChange={(val) => setCountry(val)}
                  required
                />
              </div>
              <div className="col">
                <label className="select-group-label">Region/State</label>
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                  required
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="radio-group-row">
              <label className="radio-group-label">Smoking</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="smoker" value="Yes" onChange={(e) => setSmoker(e.target.value)} required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="smoker" value="No" onChange={(e) => setSmoker(e.target.value)} required />
                  No
                </label>
                <label>
                  <input type="radio" name="smoker" value="Sometimes" onChange={(e) => setSmoker(e.target.value)} required />
                  Sometimes
                </label>
              </div>
            </div>

            <div className="radio-group-row">
              <label className="radio-group-label">Alcohol</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="drinker" value="Yes" onChange={(e) => setDrinker(e.target.value)} required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="drinker" value="No" onChange={(e) => setDrinker(e.target.value)} required />
                  No
                </label>
                <label>
                  <input type="radio" name="drinker" value="Sometimes" onChange={(e) => setDrinker(e.target.value)} required />
                  Sometimes
                </label>
              </div>
            </div>

            <div className="radio-group-row">
              <label className="radio-group-label">Looking for a Roommate</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="roommate" value="Yes" onChange={(e) => setLookingForRoommate(e.target.value)} required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="roommate" value="No" onChange={(e) => setLookingForRoommate(e.target.value)} required />
                  No
                </label>
              </div>
            </div>

            {/* Radio Buttons for Food Preference */}
            <div className="radio-group-row">
              <label className="radio-group-label">Food Preference</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="foodPreference" value="Veg" onChange={(e) => setFoodPreference(e.target.value)} required />
                  Veg
                </label>
                <label>
                  <input type="radio" name="foodPreference" value="Non-Veg" onChange={(e) => setFoodPreference(e.target.value)} required />
                  Non-Veg
                </label>
              </div>
            </div>

            {/* Social Media Inputs */}
            <div className="social-media-row">
              <label className="social-media-label">Social Media</label>
              <div className='social-media-description'>To enhance your communication and connect more effectively, we highly encourage you to share your social media handle</div>
              <input type="text" value={socialMedia.linkedIn} onChange={(e) => setSocialMedia({ ...socialMedia, linkedIn: e.target.value })} placeholder="LinkedIn Profile" />
            </div>
            
            {/* <input type="text" value={socialMedia.instagram} onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })} placeholder="Instagram Handle" />
            <input type="text" value={socialMedia.twitter} onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })} placeholder="Twitter Handle" /> */}

            {/* About You */}
            <div className="about-you-group">
              <label className="about-you-label">About You</label>
              <div className="about-you-description">
                Share a bit about yourself, such as your interests, hobbies, or what makes you unique
              </div>
              <textarea 
                className="about-you-textarea" 
                value={aboutYou} 
                onChange={(e) => setAboutYou(e.target.value)} 
                placeholder="Tell us about yourself"
                required 
              ></textarea>
            </div>
            {error && <div className="error">{error}</div>}

            <button type="submit">Join ICD</button>
          </form>
          <div className='signup-form-foot-buttons'>
            <a onClick={() => moveToLogin()}>Login</a>
            <a onClick={() => moveToHome()}>Home</a>
        </div>
        </div>
      </div>
  );
};

export default SignupForm;
