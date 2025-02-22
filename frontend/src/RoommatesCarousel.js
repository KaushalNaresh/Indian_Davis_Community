import React, { useEffect, useState, useContext, useRef } from 'react';
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
const [selectedUser, setSelectedUser] = useState(null);
const [selectedProfilePic, setSelectedProfilePic] = useState(0);

useEffect(() => {
  fetchTopMatches();
}, []);

const fetchTopMatches = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/user/top6?email=${user.email}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    
    const data = await resp.json();
    if (data.message === 'OK') {
      setRoommates(data.data);
    } else {
      setRoommates([]);
    }
  } catch (error) {
    console.error('Error fetching top 6 matches:', error);
    setRoommates([]);
  }
};

const handleViewProfile = (user, profile_pic) => {
  setSelectedUser(user);
  setSelectedProfilePic(profile_pic);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedUser(null);
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

const handleSendEmail = (email) => {
  window.location.href = `mailto:${email}`;
};

const parseDate = (val) => {
  if (!val) return null;
  const d = new Date(val);
  return `${d.getUTCDate()}-${d.getUTCMonth()}-${d.getUTCFullYear()}`;
};
// const carouselRef = useRef(null);
  return (
    <div className="roommates-carousel-container">
      <Swiper
        // ref={carouselRef}
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={30}
        speed= {1000}
        slidesPerView={5}
        navigation
        pagination={{clickable: true}}
        autoplay={{
          delay: 1000, 
          disableOnInteraction: true, 
        }}
        className="roommates-carousel"
        loop={true}
        // onMouseEnter={() => carouselRef.current.swiper.autoplay.disableOnInteraction(true)}
        // onMouseLeave={() => carouselRef.current.swiper.autoplay.start()}
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
                <button className="connect" onClick={() => handleViewProfile(roommate, index)}>
                  View Profile
                </button>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
      {selectedUser && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser.firstName} {selectedUser.lastName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Example layout with user info & icons */}
            <div className="user-profile-modal-content">
              <div className="user-profile-basic">
                <img
                  src={profilePics[selectedProfilePic] || 'fallback.jpg'}
                  alt="profile"
                  className="user-modal-pic"
                />
                <div className="user-profile-data">
                  <p><strong>Major & Degree:</strong> {selectedUser.major} - {selectedUser.degree}</p>
                  <p><strong>Expected graduation:</strong> {parseDate(selectedUser.toDate)}</p>
                  <p><strong>Location:</strong> {selectedUser.country}, {selectedUser.region}</p>
                </div>
              </div>

              <div className="user-profile-icons">
                <div className="icon-item">
                  <span>Gender:</span> {renderGenderIcon(selectedUser.gender)}
                </div>
                <div className="icon-item">
                  <span>Smoking:</span> {renderSmokerIcon(selectedUser.smoker)}
                </div>
                <div className="icon-item">
                  <span>Food:</span> {renderFoodIcon(selectedUser.foodPreference)}
                </div>
                {/* You can add a similar approach for 'drinker' */}
              </div>

              <div className="user-profile-about mt-3">
                <h5>About Me</h5>
                <p>{selectedUser.aboutYou}</p>
              </div>

              <div className="user-profile-social mt-3">
                <h5>Social Media</h5>
                <div className="social-icons">
                  {selectedUser.socialMediaAccounts && selectedUser.socialMediaAccounts.length > 0 ? (
                    selectedUser.socialMediaAccounts.map((acct, i) => (
                      <a
                        key={i}
                        href={`https://www.${acct.platform.toLowerCase()}.com/${acct.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="social-link"
                      >
                        {getSocialIcon(acct.platform)}
                      </a>
                    ))
                  ) : (
                    <p>No social media accounts added.</p>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
              {/* Send Email button in "yellow" (Bootstrap "warning") */}
              <Button
                variant="warning"
                onClick={() => handleSendEmail(selectedUser.email)}
              >
                Send Email
              </Button>
            </Modal.Footer>
        </>
      )}
    </Modal>
  </div>
  );
};

export default RoommatesCarousel;
