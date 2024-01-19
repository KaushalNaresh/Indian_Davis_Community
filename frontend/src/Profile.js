import React, {useState, useEffect, useContext} from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Header from './Header'
import Categories from './Categories'
import Select from 'react-select'
import './Profile.css'
import Constants from './StringConstants.json'
import { AuthContext } from './AuthContext'

function Profile() {

    const BASE_URL = Constants.base_url;

    const [isEditable, setIsEditable] = useState(false);

    const {user, setUserDetails} = useContext(AuthContext);

    const majorOptions = [
        { value: '2', label: "Select your major"},
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
        setUserDetails({ ...user, 'socialMediaAccounts': user.socialMediaAccounts});
    };

    const removeSocialMediaAccount = (index) => {
        user.socialMediaAccounts = user.socialMediaAccounts.filter((_, i) => i !== index);
        setUserDetails({ ...user, 'socialMediaAccounts': user.socialMediaAccounts});
    };

    // Handlers for change in input fields and toggle edit mode
    const handleInputChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
    };

    const handleSelectInputChange = (selectedOption, actionMeta) => {
        setUserDetails({ ...user, [actionMeta.name]: selectedOption.value });
    };

    const handleCountryRegionInputChange = (name, value) => {
        setUserDetails({ ...user, [name]: value});
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
        setUserDetails({ ...user, 'socialMediaAccounts': user.socialMediaAccounts});
    };

    // Handler for save button
    const saveProfile = async () => {
        try{
            // console.log('Profile saved:', user);
            setIsEditable(false);

            const response = await fetch(`${BASE_URL}/user/update`,{
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
        catch(e){
            console.log(e.message);
        }
    };

  return (
    <div className='profile'>
        <Header/>
        <Categories/>

        <div className='profile-section'>

            <div className="form-row">
                <div className="half-width-input">
                <label className="form-label">First Name</label>
                <input placeholder="Enter your first name" type="text" name="firstName" value={user.firstName} onChange={(e) => handleInputChange(e)} required />
                </div>
                <div className="half-width-input">
                <label className="form-label">Last Name</label>
                <input placeholder="Enter your last name" type="text" name="lastName" value={user.lastName} onChange={(e) => handleInputChange(e)} required />
                </div>
            </div>


            <div className="form-row">
                <div className="half-width-input">
                <label className="form-label">Email</label>
                <input placeholder="Enter your uc davis email id" type="email" name="email" value={user.email} onChange={(e) => handleInputChange(e)} required />
                </div>
                <div className="half-width-input">
                <label className="form-label">UC Davis ID</label>
                <input placeholder="Enter your uc davis student id" type="ucdavis-id" name="ucDavisId" value={user.ucDavisId} onChange={(e) => handleInputChange(e)} required />
                </div>
            </div>

            {/* From Date */}
            <div className="form-row">
                <div className="half-width-input">
                <label className="form-label">Course Start Date</label>
                <input 
                    type="date" 
                    value={getFormattedDate(new Date(user.fromDate))} 
                    name='fromDate'
                    onChange={(e) => handleInputChange(e)} 
                    required 
                />
                </div>
                <div className="half-width-input">
                <label className="form-label">Course End Date (Expected)</label>
                <input 
                    type="date" 
                    value={getFormattedDate(new Date(user.toDate))} 
                    name='toDate'
                    onChange={(e) => handleInputChange(e)}
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
                    name="major"
                    onChange={(selectedOption, actionMeta) => handleSelectInputChange(selectedOption, actionMeta)}
                    placeholder="Select Major"
                    value={majorOptions.find(option => option.value === user.major)}
                    isSearchable
                    required
                    />
                </div>
                <div className="col">
                    <label className="select-group-label">Degree</label>
                    <Select
                    options={degreeOptions}
                    onChange={(selectedOption, actionMeta) => handleSelectInputChange(selectedOption, actionMeta)}
                    placeholder="Select Degree"
                    name="degree"
                    value={degreeOptions.find(option => option.value === user.degree)}
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
                    value={user.country}
                    name='country'
                    onChange={(value) => handleCountryRegionInputChange('country', value)}
                    required
                    />
                </div>
                <div className="col">
                    <label className="select-group-label">Region/State</label>
                    <RegionDropdown
                    country={user.country}
                    value={user.region}
                    name='region'
                    onChange={(value) => handleCountryRegionInputChange('region', value)}
                    required
                    />
                </div>
                </div>

                <div className="radio-group-row">
                <label className="radio-group-label">Gender</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="gender" value="1" checked = {user.gender == '1'} onChange={(e) => handleInputChange(e)} required />
                    Male
                    </label>
                    <label>
                    <input type="radio" name="gender" value="0" checked = {user.gender == '0'} onChange={(e) => handleInputChange(e)} required />
                    Female
                    </label>
                    <label>
                    <input type="radio" name="gender" value="2" checked = {user.gender == '2'} onChange={(e) => handleInputChange(e)} required />
                    Other
                    </label>
                </div>
                </div>

                {/* Checkboxes */}
                <div className="radio-group-row">
                <label className="radio-group-label">Smoking</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="smoker" value="1" checked = {user.smoker == '1'} onChange={(e) => handleInputChange(e)} required />
                    Yes
                    </label>
                    <label>
                    <input type="radio" name="smoker" value="0" checked = {user.smoker == '0'} onChange={(e) => handleInputChange(e)} required />
                    No
                    </label>
                    <label>
                    <input type="radio" name="smoker" value="2" checked = {user.smoker == '2'} onChange={(e) => handleInputChange(e)} required />
                    Sometimes
                    </label>
                </div>
                </div>

                <div className="radio-group-row">
                <label className="radio-group-label">Alcohol</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="drinker" value="1" checked = {user.drinker == '1'} onChange={(e) => handleInputChange(e)} required />
                    Yes
                    </label>
                    <label>
                    <input type="radio" name="drinker" value="0" checked = {user.drinker == '0'} onChange={(e) => handleInputChange(e)} required />
                    No
                    </label>
                    <label>
                    <input type="radio" name="drinker" value="2" checked = {user.drinker == '2'} onChange={(e) => handleInputChange(e)} required />
                    Sometimes
                    </label>
                </div>
                </div>

                <div className="radio-group-row">
                <label className="radio-group-label">Looking for a Roommate</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="lookingForRoommate" value="1" checked = {user.lookingForRoommate == '1'} onChange={(e) => handleInputChange(e)} required />
                    Yes
                    </label>
                    <label>
                    <input type="radio" name="lookingForRoommate" value="0" checked = {user.lookingForRoommate == '0'} onChange={(e) => handleInputChange(e)} required />
                    No
                    </label>
                </div>
                </div>

                {/* Radio Buttons for Food Preference */}
                <div className="radio-group-row">
                <label className="radio-group-label">Food Preference</label>
                <div className="radio-group-inputs">
                    <label>
                    <input type="radio" name="foodPreference" value="0" checked = {user.foodPreference == '0'} onChange={(e) => handleInputChange(e)} required />
                    Veg
                    </label>
                    <label>
                    <input type="radio" name="foodPreference" value="1" checked = {user.foodPreference == '1'} onChange={(e) => handleInputChange(e)} required />
                    Non-Veg
                    </label>
                </div>
                </div>

                {/* Social Media Inputs */}
                <div className="social-media-rows">
                <label className="social-media-label">Social Media</label>
                <div className='social-media-description'>To enhance your communication and connect more effectively, we highly encourage you to share your social media handle</div>
                {user.socialMediaAccounts.map((account, index) => (
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
                    value={user.aboutYou} 
                    name='aboutYou'
                    onChange={(e) => handleInputChange(e)} 
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