import React, { useState, useEffect, useContext } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Header from './Header'
import Categories from './Categories'
import Select from 'react-select'
import './Profile.css'
import Constants from './StringConstants.json'
import { AuthContext } from './AuthContext'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';

function Profile() {

    const BASE_URL = Constants.base_url;

    const [isEditable, setIsEditable] = useState(false);
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const { user, setUserDetails } = useContext(AuthContext);

    const majorOptions = [
        { value: '2', label: "Select your major" },
        { value: 'cs', label: 'Computer Science' },
        { value: 'eec', label: 'Electrical Engineering' },
    ];
    const degreeOptions = [
        { value: '2', label: "Select your degree" },
        { value: 'bs', label: "Bachelor's" },
        { value: 'ms', label: "Master's" },
        { value: 'phd', label: "PHD" },
    ];

    const getFormattedDate = (date) => {
        const year = date.getUTCFullYear(); // 2022
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // "09" (Month is 0-indexed so +1 is necessary)
        const day = date.getUTCDate().toString().padStart(2, '0'); // "20"
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    const addSocialMediaAccount = () => {
        user.socialMediaAccounts.push({ platform: '', username: '' })
        setUserDetails({ ...user, 'socialMediaAccounts': user.socialMediaAccounts });
    };

    const removeSocialMediaAccount = (index) => {
        user.socialMediaAccounts = user.socialMediaAccounts.filter((_, i) => i !== index);
        setUserDetails({ ...user, 'socialMediaAccounts': user.socialMediaAccounts });
    };

    // Handlers for change in input fields and toggle edit mode
    const handleInputChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });

    };

    const handleSelectInputChange = (selectedOption, actionMeta) => {
        setUserDetails({ ...user, [actionMeta.name]: selectedOption.value });
    };

    const handleCountryRegionInputChange = (name, value) => {
        setUserDetails({ ...user, [name]: value });
    }

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    const handleSocialMediaChange = (index, field, value) => {
        user.socialMediaAccounts = user.socialMediaAccounts.map((account, i) => {
            if (i === index) {
                return { ...account, [field]: value };
            }
            return account;
        });
        setUserDetails({ ...user, 'socialMediaAccounts': user.socialMediaAccounts });
    };

    // Handler for save button
    const saveProfile = async () => {
        try {
            // console.log('Profile saved:', user);
            setIsEditable(false);

            setShowUpdateMessage(true);
            setTimeout(() => setShowUpdateMessage(false), 5000); // Hide the message after 3 seconds


            const response = await fetch(`${BASE_URL}/user/update`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            const res = await response.json();
            if (!response.ok)
                throw new Error(res.message);
        }
        catch (e) {
            console.log(e.message);
        }
    };

    const [validated, setValidated] = useState(false);
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [datesValid, setDatesValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [ucDavisIdValid, setUcDavisIdValid] = useState(true);
    const [majorValid, setMajorValid] = useState(true);
    const [degreeValid, setDegreeValid] = useState(true);
    const [countryValid, setCountryValid] = useState(true);
    const [regionValid, setRegionValid] = useState(true);
    const [aboutYouValid, setaboutYouValid] = useState(true);
    const [aboutYouCharLimitReached, setAboutYouCharLimitReached] = useState(false);


    const handleAboutYouChange = (e) => {

        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isAboutYouValid = e.target.value != ''
        const isAboutYouCharLimitReached = e.target.value.length == 61
        
        setaboutYouValid(isAboutYouValid);
        setAboutYouCharLimitReached(isAboutYouCharLimitReached);

        if (validated && (!isAboutYouValid || !isAboutYouCharLimitReached)) {
            setValidated(false);
        }

    };

    const handleMajorChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isMajorValid = e.target.value != '2';
        setMajorValid(isMajorValid);

        if (validated && !isMajorValid) {
            setValidated(false);
        }
    };

    const handleCountryChange = (name, value) => {
        setUserDetails({ ...user, [name]: value });
        const isCountryValid = value != '';
        setCountryValid(isCountryValid);
        setRegionValid(false);
        setValidated(false);
    };

    const handleRegionChange = (name, value) => {
        setUserDetails({ ...user, [name]: value });
        const isRegionValid = value != '';
        setRegionValid(isRegionValid);

        if (validated && !isRegionValid) {
            setValidated(false);
        }
    };

    const handleDegreeChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isDegreeValid = e.target.value != '2';
        setDegreeValid(isDegreeValid);

        if (validated && !isDegreeValid) {
            setValidated(false);
        }
    };

    const handleFirstNameChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isFirstNameValid = e.target.value != "";
        setFirstNameValid(isFirstNameValid);

        if (validated && !isFirstNameValid) {
            setValidated(false);
        }
    }

    const handleLastNameChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isLastNameValid = e.target.value != "";
        setLastNameValid(isLastNameValid);

        if (validated && !isLastNameValid) {
            setValidated(false);
        }
    }

    const handleEmailChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isEmailValid = e.target.value != "" && e.target.value.endsWith('@ucdavis.edu')
        setEmailValid(isEmailValid)

        if (validated && !isEmailValid) {
            setValidated(false);
        }
    }

    const handleUcDavisIdChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
        const isUcDavisIdValid = e.target.value != ""
        setUcDavisIdValid(isUcDavisIdValid)

        if (validated && !isUcDavisIdValid) {
            setValidated(false);
        }
    }

    const handleFromDateChange = (date, name) => {
        setUserDetails({ ...user, [name]: date });
        const toDate = new Date(user.toDate)
        const isFromDateValid = date < toDate
        setDatesValid(isFromDateValid);
        
        if (validated && !isFromDateValid) {
            setValidated(false);
        }
    };

    const handleToDateChange = (date, name) => {
        setUserDetails({ ...user, [name]: date });
        const fromDate = new Date(user.fromDate);
        const isToDateValid = fromDate < date;
        setDatesValid(isToDateValid);

        if (validated && !isToDateValid) {
            setValidated(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(firstNameValid && lastNameValid && emailValid && ucDavisIdValid &&
           datesValid && majorValid && degreeValid && countryValid && regionValid &&
           aboutYouValid){
           setValidated(true);

           try {
                // console.log('Profile saved:', user);
                setIsEditable(false);

                setShowUpdateMessage(true);
                setTimeout(() => setShowUpdateMessage(false), 5000); // Hide the message after 3 seconds


                const response = await fetch(`${BASE_URL}/user/update`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include other headers like authorization if needed
                    },
                    body: JSON.stringify(user)
                });

                const res = await response.json();
                if (!response.ok)
                    throw new Error(res.message);
            }
            catch (e) {
                console.log(e.message);
            }


        }
      };
    

    return (
        <div className='profile'>
            <Header />
            <Categories />

            <div className='profile-section'>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your first name"
                                name="firstName"
                                value={user.firstName}
                                onChange={(e) => handleFirstNameChange(e)}
                                className={`form-control ${!firstNameValid && 'is-invalid'}`}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid first name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your last name"
                                name="lastName"
                                value={user.lastName}
                                onChange={(e) => handleLastNameChange(e)}
                                className={`form-control ${!lastNameValid && 'is-invalid'}`}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid last name</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='email'
                                placeholder="Enter your email ID"
                                value={user.email}
                                onChange={(e) => handleEmailChange(e)}
                                className={`form-control ${!emailValid && 'is-invalid'}`}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid UC Davis email address</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>UC Davis ID</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your UC Davis ID"
                                name='ucDavisId'
                                value={user.ucDavisId}
                                onChange={(e) => handleUcDavisIdChange(e)}
                                className={`form-control ${!ucDavisIdValid && 'is-invalid'}`}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid UC Davis ID</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <div className='date-picker-row'>
                                <Form.Label>Course Start Date</Form.Label>
                                <DatePicker 
                                    selected={getFormattedDate(new Date(user.fromDate))}
                                    onChange={(date) => handleFromDateChange(date, 'fromDate')}
                                    className={`date-picker form-control ${!datesValid && 'is-invalid'}`}
                                />
                                <div className={`feedback ${datesValid ? 'valid-date-feedback' : 'invalid-date-feedback'}`}>
                                    {(validated && datesValid) && 'Looks good!' }
                                    {!datesValid && 'Start Date must come before End Date.'}
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <div className='date-picker-row'>
                                <Form.Label>Course End Date (Expected)</Form.Label>
                                <DatePicker 
                                    selected={getFormattedDate(new Date(user.toDate))}
                                    onChange={(date) => handleToDateChange(date, 'toDate')}
                                    className={`date-picker form-control ${!datesValid && 'is-invalid'}`}
                                />
                                <div className={`feedback ${datesValid ? 'valid-date-feedback' : 'invalid-date-feedback'}`}>
                                    {(validated && datesValid) && 'Looks good!' }
                                    {!datesValid && 'End Date must come after Start Date.'}
                                </div>
                            </div>
                        </Form.Group>
                    </Row>


                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Major</Form.Label>
                            <Form.Select 
                                name="major" 
                                aria-label="Default select example"
                                value={user.major}
                                onChange={(selectedOption, actionMeta) => handleMajorChange(selectedOption, actionMeta)}
                                className={`form-control ${!majorValid && 'is-invalid'}`}
                            >
                                <option value="2">Select your major</option>
                                <option value="cs">Computer Science</option>
                                <option value="eec">Electrical Engineering</option>
                            </Form.Select>
                            {majorValid && <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>}
                            {!majorValid && <Form.Control.Feedback type="invalid">Please enter a valid major</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Degree</Form.Label>
                            <Form.Select 
                                name="degree" 
                                aria-label="Default select example"
                                value={user.degree}
                                onChange={(selectedOption, actionMeta) => handleDegreeChange(selectedOption, actionMeta)}
                                className={`form-control ${!degreeValid && 'is-invalid'}`}
                            >
                                <option value="2">Select your degree</option>
                                <option value="bs">Bachelors</option>
                                <option value="ms">Masters</option>
                                <option value="phd">PHD</option>
                            </Form.Select>
                            {degreeValid && <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>}
                            {!degreeValid && <Form.Control.Feedback type="invalid">Please enter a valid degree</Form.Control.Feedback>}
                        </Form.Group>
                    </Row>



                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Country</Form.Label>
                            <CountryDropdown
                                    value={user.country}
                                    name='country'
                                    onChange={(value) => handleCountryChange('country', value)}
                                    className={`form-control ${!countryValid && 'is-invalid'}`}
                                    required
                                />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid country</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Region</Form.Label>
                            <RegionDropdown
                                    country={user.country}
                                    value={user.region}
                                    name='region'
                                    onChange={(value) => handleRegionChange('region', value)}
                                    className={`form-control ${!regionValid && 'is-invalid'}`}
                                    required
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid region</Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="my-3"> 
                        <Col sm={6} className="d-flex align-items-center">
                            <label className="radio-group-label">Gender</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center"> 
                            <input type="radio" name="gender" value="1" id="yes" checked={user.gender == '1'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="yes" className="d-block">Male</label> 
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="gender" value="0" id="no" checked={user.gender == '0'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="no" className="d-block">Female</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="gender" value="2" id="sometimes" checked={user.gender == '2'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="sometimes" className="d-block">Other</label>
                        </Col>
                    </Row>


                    <Row className="my-3"> 
                        <Col sm={6} className="d-flex align-items-center">
                            <label className="radio-group-label">Smoking</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center"> 
                            <input type="radio" name="smoker" value="1" id="yes" checked={user.smoker == '1'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="yes" className="d-block">Yes</label> 
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="smoker" value="0" id="no" checked={user.smoker == '0'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="no" className="d-block">No</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="smoker" value="2" id="sometimes" checked={user.smoker == '2'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="sometimes" className="d-block">Sometimes</label>
                        </Col>
                    </Row>


                    <Row className="my-3"> 
                        <Col sm={6} className="d-flex align-items-center">
                            <label className="radio-group-label">Alcohol</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center"> 
                            <input type="radio" name="drinker" value="1" id="yes" checked={user.drinker == '1'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="yes" className="d-block">Yes</label> 
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="drinker" value="0" id="no" checked={user.drinker == '0'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="no" className="d-block">No</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="drinker" value="2" id="sometimes" checked={user.drinker == '2'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="sometimes" className="d-block">Sometimes</label>
                        </Col>
                    </Row>
                        

                    <Row className="my-3">
                        <Col sm={6} className="d-flex align-items-center">
                            <label className="radio-group-label">Food Preference</label>
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center"> {/* Use text-center to align the radio button with its label */}
                            <input type="radio" name="foodPreference" value="0" id="veg" checked={user.foodPreference == '0'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="veg" className="d-block">Veg</label> {/* d-block to make the label a block element */}
                        </Col>
                        <Col sm={2} className="d-flex flex-column align-items-center justify-content-center">
                            <input type="radio" name="foodPreference" value="1" id="non-veg" checked={user.foodPreference == '1'} onChange={(e) => handleInputChange(e)} required />
                            <label htmlFor="non-veg" className="d-block">Non-Veg</label>
                        </Col>
                        <Col sm={2}> 
                            {/* Empty Column */}
                        </Col>
                    </Row>



                    <Row>
                        <Col sm={6} className='my-3'>
                            <Form.Group as={Row} controlId="formHorizontalCheck">
                                <Col sm={6} className="d-flex ">
                                    <Form.Label>
                                    Looking for a Roommate
                                    </Form.Label>
                                </Col>
                                <Col sm={6} className='d-flex justify-content-center'>
                                    <Form.Check
                                    type="switch"
                                    id="lookingForRoommate-switch"
                                    label={user.lookingForRoommate === '1' ? 'Yes' : 'No'}
                                    checked={user.lookingForRoommate === '1'}
                                    onChange={(e) => handleInputChange({
                                        target: {
                                        name: 'lookingForRoommate',
                                        value: e.target.checked ? '1' : '0', // If the switch is checked, set value to '1' (Yes), otherwise '0' (No)
                                        },
                                    })}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Social Media Inputs */}
                    <div className="social-media-rows">
                        <label className="social-media-label">Social Media</label>
                        <div className='social-media-description'>To enhance your experience and connect more effectively, we highly encourage you to share your social media handle</div>
                        {user.socialMediaAccounts.map((account, index) => (
                            <div key={index} className="social-media-row">

                                <select value={account.platform} onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}>
                                    <option value="">Select Platform</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Facebook">Facebook</option>
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
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <div className="about-you-group">
                            <label className="about-you-label">About You</label>
                            <div className="about-you-description">
                                Share a bit about yourself, such as your interests, hobbies, or what makes you unique (max 200 characters)
                            </div>
                            <textarea
                                className={`about-you-textarea form-control ${!aboutYouValid && 'is-invalid'}`}
                                value={user.aboutYou}
                                name='aboutYou'
                                onChange={(e) => handleAboutYouChange(e)}
                                placeholder="Tell us about yourself"
                                maxLength={61}
                                required
                            ></textarea>
                            <div className={`feedback ${aboutYouValid && (validated || !aboutYouCharLimitReached) ? 'valid-date-feedback' : 'invalid-date-feedback'}`}>
                                {(validated && aboutYouValid) && 'You sound like an amazing person!' }
                                {!aboutYouValid && 'Share something about you!'}
                                {!validated && aboutYouCharLimitReached && 'character limit (200) reached!'}
                            </div>
                        </div>
                    </Form.Group>

                    <button className="save-profile-btn" type='submit'>Save</button>
                    <div className='profile-form-alert'>
                        {showUpdateMessage && <Alert key="success" variant="success">Profile Updated Successfully!</Alert>}
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Profile