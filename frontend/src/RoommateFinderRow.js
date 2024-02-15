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
    X: <FaXbox />, 
  };
  return icons[platform] || null;
};

const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
};

const getFormattedDate = (date) => {
    const year = date.getUTCFullYear(); // 2022
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // "09" (Month is 0-indexed so +1 is necessary)
    const day = date.getUTCDate().toString().padStart(2, '0'); // "20"

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
            <div className="name" lang="en">{`${firstName} ${lastName}`}</div>
            {/* <div className="contact-button" onClick={() => handleContactClick(email)}>Contact</div> */}
        </div>
        <div className="roommate-info">
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
            <span className='headings'>About Me</span>
            <hr />
            <div className="bio">{aboutYou.length <= 100 ? aboutYou : aboutYou.substring(0, 100)+'...'}</div>
        </div>
    </div>
  );
};

export default RoommateFinderRow;
