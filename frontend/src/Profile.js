import React, {useState, useEffect, useContext} from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Header from './Header'
import Categories from './Categories'
import Select from 'react-select'
import './Profile.css'
import Constants from './StringConstants.json'
import { AuthContext } from './AuthContext'

function Profile() {

    const [isEditable, setIsEditable] = useState(false);

    const {user, setUser} = useContext(AuthContext);

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

    console.log(user.degree)
    const majorOptions = [
        { value: '2', label: "Select your major"},
        { value: 'cs', label: 'Computer Science' },
        { value: 'eec', label: 'Electrical Engineering' },
    ];
    const degreeOptions = [
        { value: '2', label: "Select your degree" },,
        { value: 'bs', label: "Bachelor's" },
        { value: 'ms', label: "Master's" },
        { value: 'phd', label: "PHD" },
    ];

    const getFormattedDate = (date) => {
        const year = date.getFullYear(); // 2022
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // "09" (Month is 0-indexed so +1 is necessary)
        const day = date.getDate().toString().padStart(2, '0'); // "20"
    
        const formattedDate = `${year}-${month}-${day}`; 
    
        return formattedDate;
    };

    const addSocialMediaAccount = () => {
        setSocialMediaAccounts([...socialMediaAccounts, { platform: '', username: '' }]);
    };

    const removeSocialMediaAccount = (index) => {
        const updatedAccounts = socialMediaAccounts.filter((_, i) => i !== index);
        setSocialMediaAccounts(updatedAccounts);
    };

    // Handlers for change in input fields and toggle edit mode
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    const handleSocialMediaChange = (index, field, value) => {
        const updatedAccounts = socialMediaAccounts.map((account, i) => {
          if (i === index) {
            return { ...account, [field]: value };
          }
          return account;
        });
        setSocialMediaAccounts(updatedAccounts);
    };

    // Handler for save button
    const saveProfile = () => {
        console.log('Profile saved:', user);
        // Here you can add the logic to save the updated profile data
        setIsEditable(false);
    };

    const formatted_fromDate = getFormattedDate(new Date(user.fromDate));
    const formatted_toDate = getFormattedDate(new Date(user.toDate));

  return (
    <div className='profile'>
        <Header/>
        <Categories/>

        <div className='profile-section'>

            <div className="form-row">
                <div className="half-width-input">
                <label className="form-label">First Name</label>
                <input placeholder="Enter your first name" type="text" name="firstName" value={user.firstName} onChange={handleInputChange} required />
                </div>
                <div className="half-width-input">
                <label className="form-label">Last Name</label>
                <input placeholder="Enter your last name" type="text" name="lastName" value={user.lastName} onChange={handleInputChange} required />
                </div>
            </div>


            <div className="form-row">
                <div className="half-width-input">
                <label className="form-label">Email</label>
                <input placeholder="Enter your uc davis email id" type="email" name="email" value={user.email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="half-width-input">
                <label className="form-label">UC Davis ID</label>
                <input placeholder="Enter your uc davis student id" type="ucdavis-id" name="ucdavisId" value={user.ucDavisId} onChange={(e) => setUcDavisId(e.target.value)} required />
                </div>
            </div>

            {/* From Date */}
            <div className="form-row">
                <div className="half-width-input">
                <label className="form-label">Course Start Date</label>
                <input 
                    type="date" 
                    value={formatted_fromDate} 
                    name='fromDate'
                    onChange={handleInputChange} 
                    required 
                />
                </div>
                <div className="half-width-input">
                <label className="form-label">Course End Date (Expected)</label>
                <input 
                    type="date" 
                    value={formatted_toDate} 
                    name='toDate'
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    placeholder="Select Major"
                    name="major"
                    value={majorOptions.find(option => option.value === user.major)}
                    isSearchable
                    required
                    />
                </div>
                <div className="col">
                    <label className="select-group-label">Degree</label>
                    <Select
                    options={degreeOptions}
                    onChange={handleInputChange}
                    placeholder="Select Degree"
                    name="degree"
                    // value={degreeOptions.find(option => option.value === user.degree)}
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
                    name='country'
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className="col">
                    <label className="select-group-label">Region/State</label>
                    <RegionDropdown
                    country={country}
                    value={region}
                    name='region'
                    onChange={handleInputChange}
                    required
                    />
                </div>
                </div>

                <div className="radio-group-row">
                <label className="radio-group-label">Gender</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="gender" value="1" onChange={handleInputChange} required />
                    Male
                    </label>
                    <label>
                    <input type="radio" name="gender" value="0" onChange={handleInputChange} required />
                    Female
                    </label>
                    <label>
                    <input type="radio" name="gender" value="2" onChange={handleInputChange} required />
                    Other
                    </label>
                </div>
                </div>

                {/* Checkboxes */}
                <div className="radio-group-row">
                <label className="radio-group-label">Smoking</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="smoker" value="1" onChange={handleInputChange} required />
                    Yes
                    </label>
                    <label>
                    <input type="radio" name="smoker" value="0" onChange={handleInputChange} required />
                    No
                    </label>
                    <label>
                    <input type="radio" name="smoker" value="2" onChange={handleInputChange} required />
                    Sometimes
                    </label>
                </div>
                </div>

                <div className="radio-group-row">
                <label className="radio-group-label">Alcohol</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="drinker" value="1" onChange={handleInputChange} required />
                    Yes
                    </label>
                    <label>
                    <input type="radio" name="drinker" value="0" onChange={handleInputChange} required />
                    No
                    </label>
                    <label>
                    <input type="radio" name="drinker" value="2" onChange={handleInputChange} required />
                    Sometimes
                    </label>
                </div>
                </div>

                <div className="radio-group-row">
                <label className="radio-group-label">Looking for a Roommate</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="lookingForRoommate" value="1" onChange={handleInputChange} required />
                    Yes
                    </label>
                    <label>
                    <input type="radio" name="lookingForRoommate" value="0" onChange={handleInputChange} required />
                    No
                    </label>
                </div>
                </div>

                {/* Radio Buttons for Food Preference */}
                <div className="radio-group-row">
                <label className="radio-group-label">Food Preference</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="foodPreference" value="0" onChange={handleInputChange} required />
                    Veg
                    </label>
                    <label>
                    <input type="radio" name="foodPreference" value="1" onChange={handleInputChange} required />
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
                    name='aboutYou'
                    onChange={handleInputChange} 
                    placeholder="Tell us about yourself"
                    required 
                ></textarea>
                </div>
        {/* Add other input fields as needed */}
        <button onClick={toggleEditMode}>
          {isEditable ? 'Cancel' : 'Modify'}
        </button>
        {isEditable && <button onClick={saveProfile}>Save</button>}
        </div>
    </div>
  )
}

export default Profile