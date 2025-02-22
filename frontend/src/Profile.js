import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext'
import Constants from './StringConstants.json'
import Header from './Header'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './Profile.css';

function Profile() {
    const BASE_URL = Constants.base_url;
    const { user, setUserDetails } = useContext(AuthContext);

    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const [charLimitReached, setCharLimitReached] = useState(false);

    const parseDate = (val) => {
        if (!val) return null;
        const d = new Date(val);
        return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    };

    const updateField = (key, value) => {
        setUserDetails({ ...user, [key]: value });
    };

    const handleFromDateChange = (date) => {
        updateField('fromDate', date);
    };

    const handleToDateChange = (date) => {
        updateField('toDate', date);
    };

    const handleMajorChange = (e) => {
        updateField('major', e.target.value);
    };

    const handleDegreeChange = (e) => {
        updateField('degree', e.target.value);
    };

    const handleCountryChange = (val) => {
        setUserDetails({ ...user, country: val, region: '' });
    };

    const handleRegionChange = (val) => {
        setUserDetails({ ...user, region: val });
    };

    const handlePreferenceChange = (e) => {
        updateField(e.target.name, e.target.value);
    };

    const handleSocialMediaChange = (index, field, val) => {
        const updatedAccounts = user.socialMediaAccounts.map((acc, i) => {
            if (i === index) return { ...acc, [field]: val };
            return acc;
        });
        updateField('socialMediaAccounts', updatedAccounts);
    };

    const addSocialMediaAccount = () => {
        const updated = [...(user.socialMediaAccounts || []), { platform: '', username: '' }];
        updateField('socialMediaAccounts', updated);
    };

    const removeSocialMediaAccount = (index) => {
        const updated = user.socialMediaAccounts.filter((_, i) => i !== index);
        updateField('socialMediaAccounts', updated);
    };

    const handleAboutYouChange = (e) => {
        const val = e.target.value;
        setCharLimitReached(val.length >= 200);
        updateField('aboutYou', val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    <div className="profile-section">
                        <h3>Basic Information</h3>
                        <Row>
                            <Form.Group as={Col} md="6" controlId="firstNameGroup">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={user.firstName || ''} readOnly />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="lastNameGroup">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={user.lastName || ''} readOnly />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md="6" controlId="emailGroup">
                                <Form.Label>UC Davis Email</Form.Label>
                                <Form.Control type="email" value={user.email || ''} readOnly />
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="ucDavisIdGroup">
                                <Form.Label>UC Davis ID</Form.Label>
                                <Form.Control type="text" value={user.ucDavisId || ''} readOnly />
                            </Form.Group>
                        </Row>
                    </div>

                    <div className="profile-section">
                        <h3>Academic Details</h3>
                        <Row>
                            <Form.Group as={Col} md="6" className="mb-3 d-flex flex-column">
                                <Form.Label>Course Start Date</Form.Label>
                                <DatePicker
                                    selected={parseDate(user.fromDate)}
                                    onChange={handleFromDateChange}
                                    className="form-control"
                                    placeholderText="Select start date"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mb-3 d-flex flex-column">
                                <Form.Label>Course End Date (Expected)</Form.Label>
                                <DatePicker
                                    selected={parseDate(user.toDate)}
                                    onChange={handleToDateChange}
                                    className="form-control"
                                    placeholderText="Select end date"
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md="6">
                                <Form.Label>Major (Optional)</Form.Label>
                                <Form.Select value={user.major || ''} onChange={handleMajorChange}>
                                    <option value="">No Selection</option>
                                    <option value="cs">Computer Science</option>
                                    <option value="eec">Electrical Engineering</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md="6">
                                <Form.Label>Degree (Optional)</Form.Label>
                                <Form.Select value={user.degree || ''} onChange={handleDegreeChange}>
                                    <option value="">No Selection</option>
                                    <option value="bs">Bachelor's</option>
                                    <option value="ms">Master's</option>
                                    <option value="phd">PhD</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </div>

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

                    <div className="profile-section">
                        <h3>Lifestyle & Preferences</h3>
                        <p className="section-description">
                            Use a scale from 1 (lowest) to 5 (highest).
                        </p>
                        <Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Noise Tolerance (1–5)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={user.noiseTolerance || ''}
                                    onChange={(e) => updateField('noiseTolerance', e.target.value)}
                                    placeholder="e.g., 3"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Cleanliness Level (1–5)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={user.cleanlinessLevel || ''}
                                    onChange={(e) => updateField('cleanlinessLevel', e.target.value)}
                                    placeholder="e.g., 4"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Social Comfort (1–5)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={user.socialComfortLevel || ''}
                                    onChange={(e) => updateField('socialComfortLevel', e.target.value)}
                                    placeholder="e.g., 2"
                                />
                            </Form.Group>
                        </Row>

                        <p className="mt-3 mb-2 section-description">
                            How important is it that your roommate matches you on these factors?
                            (1 = not important, 5 = must match exactly)
                        </p>
                        <Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Noise Importance</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={user.noiseImportance || ''}
                                    onChange={(e) => updateField('noiseImportance', e.target.value)}
                                    placeholder="1–5"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Cleanliness Importance</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={user.cleanlinessImportance || ''}
                                    onChange={(e) => updateField('cleanlinessImportance', e.target.value)}
                                    placeholder="1–5"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Social Importance</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={user.socialImportance || ''}
                                    onChange={(e) => updateField('socialImportance', e.target.value)}
                                    placeholder="1–5"
                                />
                            </Form.Group>
                        </Row>

                        <hr className="my-4" />

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Smoking</Form.Label>
                                    <div className="radio-group">
                                        <Form.Check inline type="radio" label="Yes" name="smoker" value="1" checked={user.smoker === '1'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="No" name="smoker" value="0" checked={user.smoker === '0'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="Sometimes" name="smoker" value="2" checked={user.smoker === '2'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="No Selection" name="smoker" value="" checked={!user.smoker} onChange={handlePreferenceChange} />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Drinking</Form.Label>
                                    <div className="radio-group">
                                        <Form.Check inline type="radio" label="Yes" name="drinker" value="1" checked={user.drinker === '1'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="No" name="drinker" value="0" checked={user.drinker === '0'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="Sometimes" name="drinker" value="2" checked={user.drinker === '2'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="No Selection" name="drinker" value="" checked={!user.drinker} onChange={handlePreferenceChange} />
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Food Preference</Form.Label>
                                    <div className="radio-group">
                                        <Form.Check inline type="radio" label="Veg" name="foodPreference" value="0" checked={user.foodPreference === '0'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="Non-Veg" name="foodPreference" value="1" checked={user.foodPreference === '1'} onChange={handlePreferenceChange} />
                                        <Form.Check inline type="radio" label="No Selection" name="foodPreference" value="" checked={!user.foodPreference} onChange={handlePreferenceChange} />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group as={Row} className="mt-3">
                                    <Form.Label column sm={6}>
                                        Looking for a Roommate?
                                    </Form.Label>
                                    <Col sm={6}>
                                        <Form.Check
                                            type="switch"
                                            id="lookingForRoommate-switch"
                                            label={user.lookingForRoommate === '1' ? 'Yes' : 'No'}
                                            checked={user.lookingForRoommate === '1'}
                                            onChange={(e) =>
                                                updateField('lookingForRoommate', e.target.checked ? '1' : '0')
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    <div className="profile-section">
                        <h3>Housing & Budget</h3>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Monthly Budget (Min)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="e.g. 500"
                                        value={user.monthlyBudgetMin || ''}
                                        onChange={(e) => updateField('monthlyBudgetMin', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Monthly Budget (Max)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="e.g. 1000"
                                        value={user.monthlyBudgetMax || ''}
                                        onChange={(e) => updateField('monthlyBudgetMax', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Housing Type</Form.Label>
                            <Form.Select
                                value={user.housingType || ''}
                                onChange={(e) => updateField('housingType', e.target.value)}
                            >
                                <option value="">No Selection</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="dorm">On-Campus Dorm</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="petFriendlyCheck">
                            <Form.Check
                                type="checkbox"
                                label="I am OK with pets"
                                checked={user.petFriendly || false}
                                onChange={(e) => updateField('petFriendly', e.target.checked)}
                            />
                        </Form.Group>
                    </div>

                    <div className="profile-section">
                        <h3>Social Media & Interests</h3>

                        <Form.Group className="mb-3">
                            <Form.Label>Hobbies / Interests (optional)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter hobbies separated by commas"
                                value={user.hobbies || ''}
                                onChange={(e) => updateField('hobbies', e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                Enter your hobbies separated by commas (e.g., Cooking, Reading, Hiking).
                            </Form.Text>
                        </Form.Group>

                        <h4>Social Media Accounts (optional)</h4>
                        {(user.socialMediaAccounts || []).map((account, index) => (
                            <div key={index} className="social-media-row mb-2">
                                <Form.Select
                                    className="platform-select"
                                    value={account.platform || ''}
                                    onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                >
                                    <option value="">Platform</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Facebook">Facebook</option>
                                </Form.Select>

                                <Form.Control
                                    className="username-input"
                                    type="text"
                                    placeholder="Profile Link or Username"
                                    value={account.username || ''}
                                    onChange={(e) => handleSocialMediaChange(index, 'username', e.target.value)}
                                />

                                <button
                                    className="btn btn-danger ms-2"
                                    type="button"
                                    onClick={() => removeSocialMediaAccount(index)}
                                >
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            className="btn btn-info mb-3"
                            type="button"
                            onClick={addSocialMediaAccount}
                        >
                            + Add Social Media
                        </button>

                        <Form.Group className="mt-2">
                            <Form.Label>About You (optional)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                maxLength={200}
                                value={user.aboutYou || ''}
                                onChange={handleAboutYouChange}
                                placeholder="Tell us more about yourself"
                            />
                            {charLimitReached && (
                                <div className="char-limit-msg">You’ve reached the 200‐character limit!</div>
                            )}
                        </Form.Group>
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
