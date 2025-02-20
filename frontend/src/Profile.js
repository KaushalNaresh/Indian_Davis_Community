import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'
import Constants from './StringConstants.json'
import Header from './Header'
// import Categories from './Categories'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './Profile.css'; // Our new CSS

function Profile() {
    const BASE_URL = Constants.base_url;
    const { user, setUserDetails } = useContext(AuthContext);
  
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  
    const getFormattedDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      // Convert to a new date with the same YYYY-MM-DD
      return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    };
    
    // Example date change logic: only validate if both are chosen
    const handleFromDateChange = (date) => {
      setUserDetails({ ...user, fromDate: date });
    };
  
    const handleToDateChange = (date) => {
      setUserDetails({ ...user, toDate: date });
    };
  
    // Example: user can fill or skip major
    const handleMajorChange = (e) => {
      setUserDetails({ ...user, major: e.target.value });
    };
  
    const handleDegreeChange = (e) => {
      setUserDetails({ ...user, degree: e.target.value });
    };
  
    const handleCountryChange = (val) => {
      setUserDetails({ ...user, country: val, region: '' });
    };
  
    const handleRegionChange = (val) => {
      setUserDetails({ ...user, region: val });
    };
  
    const handlePreferenceChange = (e) => {
      setUserDetails({ ...user, [e.target.name]: e.target.value });
    };
  
    // Social Media
    const handleSocialMediaChange = (index, field, value) => {
      const updatedAccounts = user.socialMediaAccounts.map((acc, i) => {
        if (i === index) {
          return { ...acc, [field]: value };
        }
        return acc;
      });
      setUserDetails({ ...user, socialMediaAccounts: updatedAccounts });
    };
  
    const addSocialMediaAccount = () => {
      const updated = [...user.socialMediaAccounts, { platform: '', username: '' }];
      setUserDetails({ ...user, socialMediaAccounts: updated });
    };
  
    const removeSocialMediaAccount = (index) => {
      const updated = user.socialMediaAccounts.filter((_, i) => i !== index);
      setUserDetails({ ...user, socialMediaAccounts: updated });
    };
  
    // About You
    const [charLimitReached, setCharLimitReached] = useState(false);
    const handleAboutYouChange = (e) => {
      const val = e.target.value;
      setCharLimitReached(val.length >= 200);
      setUserDetails({ ...user, aboutYou: val });
    };
  
    // Submit: only do minimal checks
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // If user provided both fromDate and toDate, ensure from < to
      if (user.fromDate && user.toDate) {
        const from = new Date(user.fromDate);
        const to = new Date(user.toDate);
        if (from >= to) {
          alert('Start date must be before end date.');
          return;
        }
      }
  
      try {
        const response = await fetch(`${BASE_URL}/user/update`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
  
        const res = await response.json();
        if (!response.ok) throw new Error(res.message);
  
        setShowUpdateMessage(true);
        setTimeout(() => setShowUpdateMessage(false), 4000);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    return (
      <div className="profile-page">
        <Header />
  
        <div className="profile-container">
          <h2 className="profile-title">Edit Your Profile</h2>
  
          <Form onSubmit={handleSubmit} className="profile-form-card">
            
            {/* SECTION 1: Basic Info (read-only) */}
            <div className="profile-section">
              <h3>Basic Information</h3>
              <Row>
                <Form.Group as={Col} md="6" controlId="firstNameGroup">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.firstName || ''}
                    readOnly 
                  />
                </Form.Group>
  
                <Form.Group as={Col} md="6" controlId="lastNameGroup">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.lastName || ''}
                    readOnly 
                  />
                </Form.Group>
              </Row>
  
              <Row>
                <Form.Group as={Col} md="6" controlId="emailGroup">
                  <Form.Label>UC Davis Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email || ''}
                    readOnly 
                  />
                </Form.Group>
  
                <Form.Group as={Col} md="6" controlId="ucDavisIdGroup">
                  <Form.Label>UC Davis ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.ucDavisId || ''}
                    readOnly 
                  />
                </Form.Group>
              </Row>
            </div>
  
            {/* SECTION 2: Academic Details (optional) */}
            <div className="profile-section">
              <h3>Academic Details</h3>
              <Row>
                <Form.Group as={Col} md="6" controlId="fromDateGroup" className="mb-3 d-flex flex-column">
                    <Form.Label>Course Start Date</Form.Label>
                    <DatePicker
                    selected={getFormattedDate(user.fromDate)}
                    onChange={handleFromDateChange}
                    className="form-control"
                    placeholderText="Select start date"
                    />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="toDateGroup" className="mb-3 d-flex flex-column">
                    <Form.Label>Course End Date (Expected)</Form.Label>
                    <DatePicker
                    selected={getFormattedDate(user.toDate)}
                    onChange={handleToDateChange}
                    className="form-control"
                    placeholderText="Select end date"
                    />
                </Form.Group>
            </Row>
  
              <Row>
                <Form.Group as={Col} md="6" controlId="majorGroup">
                  <Form.Label>Major (Optional)</Form.Label>
                  <Form.Select
                    value={user.major || ''}
                    onChange={handleMajorChange}
                  >
                    <option value="">No Selection</option>
                    <option value="cs">Computer Science</option>
                    <option value="eec">Electrical Engineering</option>
                    {/* Add more as needed */}
                  </Form.Select>
                </Form.Group>
  
                <Form.Group as={Col} md="6" controlId="degreeGroup">
                  <Form.Label>Degree (Optional)</Form.Label>
                  <Form.Select
                    value={user.degree || ''}
                    onChange={handleDegreeChange}
                  >
                    <option value="">No Selection</option>
                    <option value="bs">Bachelor's</option>
                    <option value="ms">Master's</option>
                    <option value="phd">PhD</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </div>
  
            {/* SECTION 3: Location (optional) */}
            <div className="profile-section">
              <h3>Location</h3>
              <Row>
                <Form.Group as={Col} md="6" controlId="countryGroup">
                  <Form.Label>Country (Optional)</Form.Label>
                  <CountryDropdown
                    value={user.country || ''}
                    onChange={(val) => handleCountryChange(val)}
                    className="form-control"
                    defaultOptionLabel="No Selection"
                  />
                </Form.Group>
  
                <Form.Group as={Col} md="6" controlId="regionGroup">
                  <Form.Label>Region / State (Optional)</Form.Label>
                  <RegionDropdown
                    country={user.country || ''}
                    value={user.region || ''}
                    onChange={(val) => handleRegionChange(val)}
                    className="form-control"
                    blankOptionLabel="No Selection"
                  />
                </Form.Group>
              </Row>
            </div>
  
            {/* SECTION 4: Preferences (optional) */}
            <div className="profile-section">
              <h3>Preferences</h3>
  
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <div className="radio-group">
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    name="gender"
                    value="1"
                    checked={user.gender === '1'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Female"
                    name="gender"
                    value="0"
                    checked={user.gender === '0'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Other"
                    name="gender"
                    value="2"
                    checked={user.gender === '2'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No Selection"
                    name="gender"
                    value=""
                    checked={!user.gender}
                    onChange={handlePreferenceChange}
                  />
                </div>
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Smoking</Form.Label>
                <div className="radio-group">
                  <Form.Check
                    inline
                    type="radio"
                    label="Yes"
                    name="smoker"
                    value="1"
                    checked={user.smoker === '1'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="smoker"
                    value="0"
                    checked={user.smoker === '0'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Sometimes"
                    name="smoker"
                    value="2"
                    checked={user.smoker === '2'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No Selection"
                    name="smoker"
                    value=""
                    checked={!user.smoker}
                    onChange={handlePreferenceChange}
                  />
                </div>
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Alcohol</Form.Label>
                <div className="radio-group">
                  <Form.Check
                    inline
                    type="radio"
                    label="Yes"
                    name="drinker"
                    value="1"
                    checked={user.drinker === '1'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No"
                    name="drinker"
                    value="0"
                    checked={user.drinker === '0'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Sometimes"
                    name="drinker"
                    value="2"
                    checked={user.drinker === '2'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No Selection"
                    name="drinker"
                    value=""
                    checked={!user.drinker}
                    onChange={handlePreferenceChange}
                  />
                </div>
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Food Preference</Form.Label>
                <div className="radio-group">
                  <Form.Check
                    inline
                    type="radio"
                    label="Veg"
                    name="foodPreference"
                    value="0"
                    checked={user.foodPreference === '0'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Non-Veg"
                    name="foodPreference"
                    value="1"
                    checked={user.foodPreference === '1'}
                    onChange={handlePreferenceChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="No Selection"
                    name="foodPreference"
                    value=""
                    checked={!user.foodPreference}
                    onChange={handlePreferenceChange}
                  />
                </div>
              </Form.Group>
  
              <Form.Group as={Row} className="mt-3">
                <Form.Label column sm={6}>
                  Looking for a Roommate? (Optional)
                </Form.Label>
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="lookingForRoommate-switch"
                    label={user.lookingForRoommate === '1' ? 'Yes' : 'No'}
                    checked={user.lookingForRoommate === '1'}
                    onChange={(e) =>
                      handlePreferenceChange({
                        target: {
                          name: 'lookingForRoommate',
                          value: e.target.checked ? '1' : '0',
                        },
                      })
                    }
                  />
                </Col>
              </Form.Group>
            </div>
  
            {/* SECTION 5: Social Media (optional) */}
            <div className="profile-section">
              <h3>Social Media</h3>
              <p className="section-description">
                Enhance your experience by sharing your social media accounts.
              </p>
              {user.socialMediaAccounts?.map((account, index) => (
                <div key={index} className="social-media-row">
                  <Form.Select
                    className="platform-select"
                    value={account.platform || ''}
                    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                  >
                    <option value="">Select Platform</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                  </Form.Select>
  
                  <Form.Control
                    className="username-input"
                    type="text"
                    placeholder="Username"
                    value={account.username || ''}
                    onChange={(e) => handleSocialMediaChange(index, 'username', e.target.value)}
                  />
  
                  <button
                    className="remove-social-media-btn"
                    type="button"
                    onClick={() => removeSocialMediaAccount(index)}
                  >
                    -
                  </button>
                </div>
              ))}
              <button className="add-social-media-btn" type="button" onClick={addSocialMediaAccount}>
                +
              </button>
            </div>
  
            {/* SECTION 6: About You (optional) */}
            <div className="profile-section">
              <h3>About You</h3>
              <p className="section-description">
                Share a bit about yourself (max 200 characters). This field is optional.
              </p>
              <Form.Control
                as="textarea"
                rows={4}
                maxLength={200}
                placeholder="Tell us about yourself (optional)"
                value={user.aboutYou || ''}
                onChange={handleAboutYouChange}
              />
              {charLimitReached && (
                <div className="char-limit-msg">You’ve reached the 200‐character limit!</div>
              )}
            </div>
  
            <div className="save-btn-wrapper">
              <button className="save-profile-btn" type="submit">
                Save
              </button>
            </div>
  
            {showUpdateMessage && (
              <Alert key="success" variant="success" className="mt-3">
                Profile Updated Successfully!
              </Alert>
            )}
          </Form>
        </div>
      </div>
    );
  }

export default Profile;
