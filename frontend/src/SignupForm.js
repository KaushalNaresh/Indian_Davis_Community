// SignupForm.js
import React, { useState, useContext } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import './SignupForm.css'; 
import { useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';
import Constants from "./StringConstants.json"

const SignupForm = ({setShowLogIn, setShowSignUp}) => {
  const BASE_URL = Constants.base_url;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ucDavisId, setUcDavisId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [major, setMajor] = useState('');
  const [degree, setDegree] = useState('');
  const [gender, setGender] = useState('');
  const [smoker, setSmoker] = useState('');
  const [drinker, setDrinker] = useState('');
  const [lookingForRoommate, setLookingForRoommate] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [socialMediaAccounts, setSocialMediaAccounts] = useState([{ platform: '', username: '' }]);
  const [aboutYou, setAboutYou] = useState('');
  const [error, setError] = useState('');
  const { login, setUserDetails } = useContext(AuthContext);

  const majorOptions = [
    { value: 'cs', label: 'Computer Science' },
    { value: 'eec', label: 'Electrical Engineering' },
    // ... other majors
  ];
  const degreeOptions = [
    { value: 'bs', label: "Bachelor's" },
    { value: 'ms', label: "Master's" },
    { value: 'phd', label: "PHD" },
    // ... other degrees
  ];

  const validator = require("validator");
  const navigate = useNavigate();


  const handleSocialMediaChange = (index, field, value) => {
    const updatedAccounts = socialMediaAccounts.map((account, i) => {
      if (i === index) {
        return { ...account, [field]: value };
      }
      return account;
    });
    setSocialMediaAccounts(updatedAccounts);
  };

  const handleAboutYouChange = (e) => {
    const text = e.target.value;
    const words = text.split(/\s+/);
  
    if (words.length <= 200) {
      setAboutYou(text);
      setError("");
    } else {
      setError("You have reached the word limit of 200 words!");
    }
  };

  const addSocialMediaAccount = () => {
    setSocialMediaAccounts([...socialMediaAccounts, { platform: '', username: '' }]);
  };

  const removeSocialMediaAccount = (index) => {
    const updatedAccounts = socialMediaAccounts.filter((_, i) => i !== index);
    setSocialMediaAccounts(updatedAccounts);
  };

  const fetchDetails = async function(){
    try {
        const response = await fetch(`${BASE_URL}/user/details?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const userDetails = await response.json();
      if (!response.ok) 
        throw new Error(userDetails.message);

      setUserDetails(userDetails[0]);
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
        if(password !== confirmPassword)
          throw new Error("Password and Confirm Password doesn't match!")
        if(!email.endsWith("@ucdavis.edu"))
          throw new Error("Enter your UC Davis email ID");

        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);

        if(fromDateObj >= toDateObj)
          throw new Error("From Date cannot come after To Date!");

        const response = await fetch(`${BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            firstName,
            lastName,
            email, 
            password, 
            ucDavisId,
            fromDate,
            toDate,
            country,
            region,
            major,
            degree,
            gender,
            smoker,
            drinker,
            lookingForRoommate,
            foodPreference,
            socialMediaAccounts,
            aboutYou
          })
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

          {/* From Date */}
          <div className="form-row">
            <div className="half-width-input">
              <label className="form-label">From</label>
              <input 
                type="date" 
                value={fromDate} 
                onChange={(e) => setFromDate(e.target.value)} 
                required 
              />
            </div>
            <div className="half-width-input">
              <label className="form-label">To (Expected)</label>
              <input 
                type="date" 
                value={toDate} 
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
          </div>
          {/* To (Expected) Date */}
          

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

            <div className="radio-group-row">
              <label className="radio-group-label">Gender</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="gender" value="1" onChange={(e) => setGender(e.target.value)} required />
                  Male
                </label>
                <label>
                  <input type="radio" name="gender" value="0" onChange={(e) => setGender(e.target.value)} required />
                  Female
                </label>
                <label>
                  <input type="radio" name="gender" value="2" onChange={(e) => setGender(e.target.value)} required />
                  Other
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="radio-group-row">
              <label className="radio-group-label">Smoking</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="smoker" value="1" onChange={(e) => setSmoker(e.target.value)} required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="smoker" value="0" onChange={(e) => setSmoker(e.target.value)} required />
                  No
                </label>
                <label>
                  <input type="radio" name="smoker" value="2" onChange={(e) => setSmoker(e.target.value)} required />
                  Sometimes
                </label>
              </div>
            </div>

            <div className="radio-group-row">
              <label className="radio-group-label">Alcohol</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="drinker" value="1" onChange={(e) => setDrinker(e.target.value)} required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="drinker" value="0" onChange={(e) => setDrinker(e.target.value)} required />
                  No
                </label>
                <label>
                  <input type="radio" name="drinker" value="2" onChange={(e) => setDrinker(e.target.value)} required />
                  Sometimes
                </label>
              </div>
            </div>

            <div className="radio-group-row">
              <label className="radio-group-label">Looking for a Roommate</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="roommate" value="1" onChange={(e) => setLookingForRoommate(e.target.value)} required />
                  Yes
                </label>
                <label>
                  <input type="radio" name="roommate" value="0" onChange={(e) => setLookingForRoommate(e.target.value)} required />
                  No
                </label>
              </div>
            </div>

            {/* Radio Buttons for Food Preference */}
            <div className="radio-group-row">
              <label className="radio-group-label">Food Preference</label>
              <div className="radio-group-inputs">
                <label>
                  <input type="radio" name="foodPreference" value="0" onChange={(e) => setFoodPreference(e.target.value)} required />
                  Veg
                </label>
                <label>
                  <input type="radio" name="foodPreference" value="1" onChange={(e) => setFoodPreference(e.target.value)} required />
                  Non-Veg
                </label>
              </div>
            </div>

            {/* Social Media Inputs */}
            <div className="social-media-rows">
              <label className="social-media-label">Social Media</label>
              <div className='social-media-description'>To enhance your communication and connect more effectively, we highly encourage you to share your social media handle</div>
              {socialMediaAccounts.map((account, index) => (
                <div key={index} className="social-media-row">

                    <select value={account.platform} onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}>
                      <option value="">Select Platform</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Snapchat">Snapchat</option>
                    </select>

                    <input
                      type="text"
                      value={account.username}
                      onChange={(e) => handleSocialMediaChange(index, 'username', e.target.value)}
                      placeholder="Username"
                    />
                    <button className="remove-social-media-btn" type="button" onClick={() => removeSocialMediaAccount(index)}>-</button>

                </div>
              ))}
            </div>
            <button className="add-social-media-btn" type="button" onClick={addSocialMediaAccount}>+</button>

            {/* About You */}
            <div className="about-you-group">
              <label className="about-you-label">About You</label>
              <div className="about-you-description">
                Share a bit about yourself, such as your interests, hobbies, or what makes you unique
              </div>
              <textarea 
                className="about-you-textarea" 
                value={aboutYou} 
                onChange={(e) => handleAboutYouChange(e)} 
                placeholder="Tell us about yourself"
                required 
              ></textarea>
            </div>
            {error && <div className="error">{error}</div>}

            <button className="signup-form-btn" type="submit">Join ICD</button>
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
