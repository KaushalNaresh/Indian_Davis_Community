import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import Constants from "./StringConstants.json"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules';
import StudentsImg1 from './images/student_1.jpg';
import StudentsImg2 from './images/student_2.jpg';
import StudentsImg3 from './images/student_3.jpg';
import StudentsImg4 from './images/student_4.jpg';
import StudentsImg5 from './images/student_5.jpg';
import StudentsImg6 from './images/student_6.jpeg';
import RoommateProfileModal from './components/RoommateProfileModal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';

import './RoommatesCarousel.css'; // Make sure to create this CSS file

import { Modal, Button } from 'react-bootstrap'; 
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { GiChickenLeg, GiThreeLeaves } from 'react-icons/gi';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { IoMdTransgender } from 'react-icons/io';
import { FaSmoking, FaSmokingBan } from 'react-icons/fa';
  

const RoommatesCarousel = () => {
const BASE_URL = Constants.base_url;
const {isLoggedIn, user} = useContext(AuthContext);
const profilePics = [StudentsImg4, StudentsImg2, StudentsImg1, StudentsImg3, StudentsImg5, StudentsImg6]

const [roommates, setRoommates] = useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedRoommate, setSelectedRoommate] = useState(null);

useEffect(() => {
  fetchTopMatches();
}, []);

const fetchTopMatches = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/user/top6?email=${user.email}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    
    const data = await resp.json();
    console.log('Carousel data:', data); // For debugging
    if (data.success) {
      setRoommates(data.data);
    } else {
      console.error('Failed to fetch carousel data:', data.message);
      setRoommates([]);
    }
  } catch (error) {
    console.error('Error fetching top 6 matches:', error);
    setRoommates([]);
  }
};

const handleViewProfile = (roommate) => {
  setSelectedRoommate(roommate);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedRoommate(null);
};

const renderGenderIcon = (genderValue) => {
  if (genderValue === '1') return <BsGenderMale title="Male" />;
  if (genderValue === '0') return <BsGenderFemale title="Female" />;
  if (genderValue === '2') return <IoMdTransgender title="Other" />;
  return <span>No selection</span>;
};

const renderFoodIcon = (foodValue) => {
  if (foodValue === '0') return <GiThreeLeaves title="Veg" />;
  if (foodValue === '1') return <GiChickenLeg title="Non-Veg" />;
  return <span>No selection</span>;
};

const renderSmokerIcon = (smokerValue) => {
  if (smokerValue === '1') return <FaSmoking title="Smokes" />;
  if (smokerValue === '0') return <FaSmokingBan title="Non-smoker" />;
  if (smokerValue === '2') return <span>Sometimes</span>;
  return <span>No selection</span>;
};

const getSocialIcon = (platform) => {
  switch (platform?.toLowerCase()) {
    case 'facebook': return <FaFacebook />;
    case 'instagram': return <FaInstagram />;
    case 'linkedin': return <FaLinkedin />;
    default: return null;
  }
};

const handleConnect = (email) => {
  window.location.href = `mailto:${email}`;
};

const parseDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return `${d.getUTCDate()}-${d.getUTCMonth()}-${d.getUTCFullYear()}`;
};

return (
  <div className="roommates-carousel-container">
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      spaceBetween={30}
      speed={1000}
      slidesPerView={5}
      navigation
      pagination={{clickable: true}}
      autoplay={{
        delay: 1000, 
        disableOnInteraction: true,
        pauseOnMouseEnter: true
      }}
      className="roommates-carousel"
      loop={true}
    >
      {roommates.map((roommate, index) => (
        <SwiperSlide key={index}>
          <div className="roommates-carousel-card">
            <img
              className="roommates-carousel-image"
              src={profilePics[index] || 'fallback.jpg'}
              alt="profile"
            />
            <div className="roommates-carousel-info">
              <span className="roommates-carousel-name">
                {roommate.firstName} {roommate.lastName}
              </span>
              <span className="roommates-carousel-major">
                {roommate.major} - {roommate.degree}
              </span>
            </div>
            <button className="connect" onClick={() => handleViewProfile(roommate)}>
              View Profile
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <RoommateProfileModal
      show={showModal}
      onHide={handleCloseModal}
      roommate={selectedRoommate}
      profilePics={profilePics}
      roommates={roommates}
      onConnect={handleConnect}
    />
  </div>
);
};

export default RoommatesCarousel;
