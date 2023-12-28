import React, {useState, useEffect} from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { GiChickenLeg } from "react-icons/gi";
import { GiThreeLeaves } from "react-icons/gi";
import LocalBarIcon from '@mui/icons-material/LocalBar';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import Select from 'react-select';
import Constants from './constants.json';

import "./FilterBar.css"

function FilterBar({setRoommates}) {

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
            const response = await fetch(`${BASE_URL}/user/details?toDate=${toDate}&fromDate=${fromDate}&major=${major}&degree=${degree}&country=${country}&region=${region}&foodPreference=${foodPreference}&smoker=${smoker}&drinker=${drinker}&gender=${gender}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
    
            const userDetails = await response.json();
            console.log(userDetails);
            if (!response.ok) 
                throw new Error(userDetails.message);
        }
        catch(e){
            console.log(e.message);
        }
      };

    useEffect(() => {
        fetchDetails();
    }, [toDate, fromDate, major, degree, country, region, foodPreference, gender, smoker, drinker, gender]); 


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
                <input 
                    type="date" 
                    value={fromDate} 
                    onChange={(e) => setFromDate(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={toDate} 
                    onChange={(e) => setToDate(e.target.value)} 
                    required 
                />
                <Select
                    options={majorOptions}
                    onChange={(selectedOption) => setMajor(selectedOption.value)}
                    placeholder="Select Major"
                    isSearchable
                    required
                />
                <Select
                    options={degreeOptions}
                    onChange={(selectedOption) => setDegree(selectedOption.value)}
                    placeholder="Select Degree"
                    isSearchable
                    required
                />
                <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)}
                    required
                />
                <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(val) => setRegion(val)}
                    required
                />

            </div>
            <div className='filter-checkbox'>
                
                <div className='filter-food'>
                    <div className='filter-checkbox-title'>Food</div>
                    <label>
                        <GiChickenLeg />
                        <input type="radio" name="food" value="1" onChange={(e) => setFoodPreference(e.target.value)}  />
                    </label>
                    <label>
                        <GiThreeLeaves />
                        <input type="radio" name="food" value="0" onChange={(e) => setFoodPreference(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="food" value="2" onChange={(e) => setFoodPreference(e.target.value)}  />
                    </label>
                </div>

                <div className='filter-smoking'>
                    <div className='filter-checkbox-title'>Smoking</div>
                    <label>
                        <SmokingRoomsIcon />
                        <input type="radio" name="smoke" value="1" onChange={(e) => setSmoker(e.target.value)}  />
                    </label>
                    <label>
                        <SmokeFreeIcon />
                        <input type="radio" name="smoke" value="0" onChange={(e) => setSmoker(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="smoke" value="2" onChange={(e) => setSmoker(e.target.value)}  />
                    </label>
                </div>

                <div className='filter-drinking'>
                    <div className='filter-checkbox-title'>Drinking</div>
                    <label>
                        <LocalBarIcon />
                        <input type="radio" name="drinking" value="1" onChange={(e) => setDrinker(e.target.value)}  />
                    </label>
                    <label>
                        <NoDrinksIcon />
                        <input type="radio" name="drinking" value="0" onChange={(e) => setDrinker(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="drinking" value="2" onChange={(e) => setDrinker(e.target.value)}  />
                    </label>
                </div>

                <div className='filter-gender'>
                    <div className='filter-checkbox-title'>Gender</div>
                    <label>
                        <MaleIcon />
                        <input type="radio" name="gender" value="1" onChange={(e) => setGender(e.target.value)}  />
                    </label>
                    <label>
                        <FemaleIcon />
                        <input type="radio" name="gender" value="0" onChange={(e) => setGender(e.target.value)}  />
                    </label>
                    <label>
                        <span>Doesn't matter</span>
                        <input type="radio" name="gender" value="2" onChange={(e) => setGender(e.target.value)}  />
                    </label>
                </div>

            </div>
        </div>
    );
}

export default FilterBar;