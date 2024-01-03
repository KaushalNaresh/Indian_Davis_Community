import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaSnapchatGhost, FaXbox } from 'react-icons/fa';
import './RoommateFinderRow.css';
import ICONS from './IconConstants';
import Constants from './StringConstants.json';

const getSocialIcon = (platform) => {
  const icons = {
    facebook: <ICONS.FaFacebook />,
    instagram: <ICONS.FaInstagram />,
    linkedin: <ICONS.FaLinkedin />,
    snapchat: <ICONS.FaSnapchatGhost />,
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

  const smokerIcon = smoker === '1' ? <ICONS.SmokingRoomsIcon /> : <ICONS.SmokeFreeIcon />;
  const drinkerIcon = drinker === '1' ? <ICONS.LocalBarIcon /> : <ICONS.NoDrinksIcon />;
  const foodIcon = foodPreference === '1' ? <ICONS.GiChickenLeg /> : <ICONS.GiThreeLeaves />;
  const genderIcon = gender === '1' ? <ICONS.MaleIcon /> : gender === '0' ? <ICONS.FemaleIcon /> : null; 

  const formatted_fromDate = getFormattedDate(new Date(fromDate));
  const formatted_toDate = getFormattedDate(new Date(toDate));
 
  return (
    <div className={`roommate-card`}>
        <div className={`roommate-name gradient-custom ${Constants.foodPreference[foodPreference]}`}>
            <div className="name">{`${firstName} ${lastName}`}</div>
            {/* <div className="contact-button" onClick={() => handleContactClick(email)}>Contact</div> */}
        </div>
        <div className="roommate-info">
            <h3>Information</h3>
            <hr/>
            <div className="major-degree"><span>Major and Degree : </span>{`${Constants.major[major]}, ${Constants.degree[degree]}`}</div>
            <div className="country-region"><span>Country and Region : </span>{`${country}, ${region}`}</div>
            <div className="from-to"><span>Dates attending : </span>{`${formatted_fromDate} : ${formatted_toDate}`}</div>
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
            <h3>About Me</h3>
            <hr />
            {/* <div className="email">{email}</div> */}
            <div className="bio">{aboutYou}</div>
        </div>
    </div>
  );
};

export default RoommateFinderRow;
