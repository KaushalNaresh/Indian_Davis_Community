import React, {useState, useEffect} from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ICONS from './IconConstants';
import Select from 'react-select';
import Constants from './StringConstants.json';

import "./FilterBar.css"

function FilterBar({setRoommates, setTotalPages, setCurrPageId, currPageId, prevPageNumber=-1, currPageNumber=0}) {

    const [toDate, setToDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [foodPreference, setFoodPreference] = useState('');
    const [smoker, setSmoker] = useState('');
    const [drinker, setDrinker] = useState('');
    const [gender, setGender] = useState('');

    const BASE_URL = Constants.base_url;

    const fetchDetails = async function(){
        try {
            // const response = await fetch(`${BASE_URL}/user/details?toDate=${toDate}&fromDate=${fromDate}&major=${major}&degree=${degree}&country=${country}&region=${region}&foodPreference=${foodPreference}&smoker=${smoker}&drinker=${drinker}&gender=${gender}`,
            console.log(country, region)
            const response = await fetch(`${BASE_URL}/user/details?currPageId=${currPageId}&currPageNumber=${currPageNumber}&prevPageNumber=${prevPageNumber}`,
            {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toDate,
                    fromDate,
                    major, 
                    degree,
                    country,
                    region,
                    foodPreference,
                    gender,
                    smoker, 
                    drinker
                })
            });
    
            const userDetails = await response.json();
            if (!response.ok) 
                throw new Error(userDetails.message);
            return userDetails;
        }
        catch(e){
            console.log(e.message);
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            const user_details = await fetchDetails();
            setRoommates(user_details.users);
            setTotalPages(user_details.totalPages);
            setCurrPageId(user_details.currPageId);
        }
        fetchData();
    }, [currPageNumber, toDate, fromDate, major, degree, country, region, foodPreference, gender, smoker, drinker, gender]); 


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

    return (
        <div className='filterbar'>
            <div className='filter-select'>
                <div className='select-from-date'>
                    <span>Start Date</span>
                    <input 
                        type="date" 
                        value={fromDate} 
                        onChange={(e) => setFromDate(e.target.value)} 
                        required 
                    />
                </div>
                <div className='select-to-date'>
                    <span>End Date (Expected)</span>
                    <input 
                        type="date" 
                        value={toDate} 
                        onChange={(e) => setToDate(e.target.value)} 
                        required 
                    />
                </div>
                <div className='select-major'>
                    <span>Major</span>
                    <Select
                        options={majorOptions}
                        onChange={(selectedOption) => setMajor(selectedOption.value)}
                        placeholder="Select Major"
                        isSearchable
                        required
                    />
                </div>
                <div className='select-degree'>
                    <span>Degree</span>
                    <Select
                        options={degreeOptions}
                        onChange={(selectedOption) => setDegree(selectedOption.value)}
                        placeholder="Select Degree"
                        isSearchable
                        required
                    />
                </div>
                <div className='select-country'>
                    <span>Country</span>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        required
                    />
                </div>
                <div className='select-region'>
                    <span>Region</span>
                    <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => setRegion(val)}
                        required
                    />
                </div>

            </div>
            <div className='filter-checkbox'>
                
                <div className='filter-food'>
                    <div className='filter-checkbox-title'>Food Preference</div>
                    <label>
                        <ICONS.GiChickenLeg />
                        <span>Non-Vegetarian</span>
                        <input type="radio" name="food" value="1" onChange={(e) => setFoodPreference(e.target.value)}  />
                    </label>
                    <label>
                        <ICONS.GiThreeLeaves />
                        <span>Vegetarian</span>
                        <input type="radio" name="food" value="0" onChange={(e) => setFoodPreference(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="food" value="2" onChange={(e) => setFoodPreference(e.target.value)} />
                    </label>
                </div>

                <div className='filter-smoking'>
                    <div className='filter-checkbox-title'>Smoking</div>
                    <label>
                        <ICONS.SmokingRoomsIcon />
                        <span>Yes</span>
                        <input type="radio" name="smoke" value="1" onChange={(e) => setSmoker(e.target.value)}  />
                    </label>
                    <label>
                        <ICONS.SmokeFreeIcon />
                        <span>No</span>
                        <input type="radio" name="smoke" value="0" onChange={(e) => setSmoker(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="smoke" value="2" onChange={(e) => setSmoker(e.target.value)} />
                    </label>
                </div>

                <div className='filter-drinking'>
                    <div className='filter-checkbox-title'>Drinking</div>
                    <label>
                        <ICONS.LocalBarIcon />
                        <span>Yes</span>
                        <input type="radio" name="drinking" value="1" onChange={(e) => setDrinker(e.target.value)}  />
                    </label>
                    <label>
                        <ICONS.NoDrinksIcon />
                        <span>No</span>
                        <input type="radio" name="drinking" value="0" onChange={(e) => setDrinker(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="drinking" value="2" onChange={(e) => setDrinker(e.target.value)} />
                    </label>
                </div>

                <div className='filter-gender'>
                    <div className='filter-checkbox-title'>Gender</div>
                    <label>
                        <ICONS.MaleIcon />
                        <span>Male</span>
                        <input type="radio" name="gender" value="1" onChange={(e) => setGender(e.target.value)}  />
                    </label>
                    <label>
                        <ICONS.FemaleIcon />
                        <span>Female</span>
                        <input type="radio" name="gender" value="0" onChange={(e) => setGender(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="gender" value="2" onChange={(e) => setGender(e.target.value)} />
                    </label>
                </div>

            </div>
        </div>
    );
}

export default FilterBar;