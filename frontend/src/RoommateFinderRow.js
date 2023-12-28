import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaSnapchatGhost, FaXbox } from 'react-icons/fa';
import './RoommateFinderRow.css'
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { GiChickenLeg } from "react-icons/gi";
import { GiThreeLeaves } from "react-icons/gi";
import LocalBarIcon from '@mui/icons-material/LocalBar';
import NoDrinksIcon from '@mui/icons-material/NoDrinks';
import Constants from './constants.json';

const getSocialIcon = (platform) => {
  const icons = {
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    snapchat: <FaSnapchatGhost />,
    X: <FaXbox />, // Assuming 'X' represents Xbox here
  };
  return icons[platform] || null;
};

const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
};

const getFormattedDate = (date) => {
    const year = date.getFullYear(); // 2022
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // "09" (Month is 0-indexed so +1 is necessary)
    const day = date.getDate().toString().padStart(2, '0'); // "20"

    const formattedDate = `${year}-${month}-${day}`; 

    return formattedDate;
};

const RoommateFinderRow = ({ roommate }) => {
  const {
    firstName,
    lastName,
    email,
    fromDate,
    toDate,
    country,
    region,
    major,
    degree,
    gender,
    smoker,
    drinker,
    foodPreference,
    socialMediaAccounts,
    aboutYou,
  } = roommate;

  const smokerIcon = smoker === '1' ? <SmokingRoomsIcon /> : <SmokeFreeIcon />;
  const drinkerIcon = drinker === '1' ? <LocalBarIcon /> : <NoDrinksIcon />;
  const foodIcon = foodPreference === '1' ? <GiChickenLeg /> : <GiThreeLeaves />;
  const genderIcon = gender === '1' ? <MaleIcon /> : gender === '0' ? <FemaleIcon /> : null; 

  const formatted_fromDate = getFormattedDate(new Date(fromDate));
  const formatted_toDate = getFormattedDate(new Date(toDate));
 
  return (
    <div className={`roommate-card ${Constants.foodPreference[foodPreference]}`}>
        <div className="roommate-info">
            <div className="name">{`${firstName} ${lastName}`}</div>
            <div className="major-degree">{`${Constants.major[major]}, ${Constants.degree[degree]}`}</div>
            <div className="country-region">{`${country}, ${region}`}</div>
            <div className="from-to">{`${formatted_fromDate} : ${formatted_toDate}`}</div>
            <div className="icons">
                {genderIcon}
                {smokerIcon}
                {drinkerIcon}
                {foodIcon}
            </div>
            <div className="social-media-icons">
                {socialMediaAccounts.map((account, index) => (
                    <a key={index} href={account.username} >
                        {getSocialIcon(account.platform.toLowerCase())}
                    </a>
                ))}
            </div>
            <hr />
            {/* <div className="email">{email}</div> */}
            <div className="bio">{aboutYou}</div>
        </div>
        <div className="contact-button" onClick={() => handleContactClick(email)}>Contact</div>
    </div>
  );
};

export default RoommateFinderRow;
