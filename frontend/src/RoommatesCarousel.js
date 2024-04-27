import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
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
  

const RoommatesCarousel = () => {
const {isLoggedIn, user} = useContext(AuthContext);

// const navigationPrevRef = React.useRef(null);
// const navigationNextRef = React.useRef(null);


const roommates = [
    {
      profilePic: StudentsImg4,
      firstName: "Naresh Kumar",
      lastName: "Kaushal",
      email: "john.doe@example.com",
      ucDavisId: "123456",
      toDate: "2024-12-31",
      fromDate: "2024-01-01",
      major: "Computer Science",
      degree: "Master's",
      country: "USA",
      region: "CA",
      foodPreference: "Vegetarian",
      smoker: "No",
      drinker: "No",
      gender: "Male",
      lookingForRoommate: "Yes",
      aboutYou: "Love coding and hiking.",
      socialMediaAccounts: [{ platform: 'Facebook', username: 'john.doe' }]
    },
    {
      profilePic: StudentsImg1,
      firstName: "Rutuja",
      lastName: "Kale",
      email: "jane.smith@example.com",
      ucDavisId: "654321",
      toDate: "2024-12-31",
      fromDate: "2024-01-01",
      major: "Electrical Engineering",
      degree: "Bachelor's",
      country: "USA",
      region: "CA",
      foodPreference: "Non-Vegetarian",
      smoker: "No",
      drinker: "Occasionally",
      gender: "Female",
      lookingForRoommate: "Yes",
      aboutYou: "Passionate about music and technology.",
      socialMediaAccounts: [{ platform: 'Instagram', username: 'jane.smith' }]
    },
    { 
        profilePic: StudentsImg3,
        firstName: "Aishwarya",
        lastName: "Dwivedi",
        email: "jane.smith@example.com",
        ucDavisId: "654321",
        toDate: "2024-12-31",
        fromDate: "2024-01-01",
        major: "Electrical Engineering",
        degree: "Bachelor's",
        country: "USA",
        region: "CA",
        foodPreference: "Non-Vegetarian",
        smoker: "No",
        drinker: "Occasionally",
        gender: "Female",
        lookingForRoommate: "Yes",
        aboutYou: "Passionate about music and technology.",
        socialMediaAccounts: [{ platform: 'Instagram', username: 'jane.smith' }]
      },
      { 
        profilePic: StudentsImg2,
        firstName: "Jahnvi",
        lastName: "Akula",
        email: "jane.smith@example.com",
        ucDavisId: "654321",
        toDate: "2024-12-31",
        fromDate: "2024-01-01",
        major: "Electrical Engineering",
        degree: "Bachelor's",
        country: "USA",
        region: "CA",
        foodPreference: "Non-Vegetarian",
        smoker: "No",
        drinker: "Occasionally",
        gender: "Female",
        lookingForRoommate: "Yes",
        aboutYou: "Passionate about music and technology.",
        socialMediaAccounts: [{ platform: 'Instagram', username: 'jane.smith' }]
      },
      { 
        profilePic: StudentsImg5,
        firstName: "Sofia",
        lastName: "Sheikh",
        email: "jane.smith@example.com",
        ucDavisId: "654321",
        toDate: "2024-12-31",
        fromDate: "2024-01-01",
        major: "Electrical Engineering",
        degree: "Bachelor's",
        country: "USA",
        region: "CA",
        foodPreference: "Non-Vegetarian",
        smoker: "No",
        drinker: "Occasionally",
        gender: "Female",
        lookingForRoommate: "Yes",
        aboutYou: "Passionate about music and technology.",
        socialMediaAccounts: [{ platform: 'Instagram', username: 'jane.smith' }]
      },
      { 
        profilePic: StudentsImg6,
        firstName: "Apoorva",
        lastName: "Shete",
        email: "jane.smith@example.com",
        ucDavisId: "654321",
        toDate: "2024-12-31",
        fromDate: "2024-01-01",
        major: "Electrical Engineering",
        degree: "Bachelor's",
        country: "USA",
        region: "CA",
        foodPreference: "Non-Vegetarian",
        smoker: "No",
        drinker: "Occasionally",
        gender: "Female",
        lookingForRoommate: "Yes",
        aboutYou: "Passionate about music and technology.",
        socialMediaAccounts: [{ platform: 'Instagram', username: 'jane.smith' }]
      },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      spaceBetween={30}
      speed= {2000}
      slidesPerView={5}
      navigation
    //   navigation={{
    //     prevEl: navigationPrevRef.current,
    //     nextEl: navigationNextRef.current,
    //   }}
    //   onBeforeInit={(swiper) => {
    //     swiper.params.navigation.prevEl = navigationPrevRef.current;
    //     swiper.params.navigation.nextEl = navigationNextRef.current;
    //   }}
    //   pagination={{el: ".swiper-pagination", clickable: true }}
     pagination={{clickable: true}}
      autoplay={{
        delay: 2000, 
        disableOnInteraction: false, 
      }}
      className="roommates-carousel"
      loop={true}
    >
      {/* <div ref={navigationPrevRef} className="swiper-button-prev-outside"></div>
      <div ref={navigationNextRef} className="swiper-button-next-outside"></div> */}
      {roommates.map((roommate, index) => (
        <SwiperSlide key={index}>
          <div className="roommates-carousel-card">
            <img className='roommates-carousel-image' src={roommate.profilePic}></img>
            <div className='roommates-carousel-info'>
                <span className='roommates-carousel-name'>{roommate.firstName} {roommate.lastName}</span>
                <span className='roommates-carousel-major'>{roommate.major} - {roommate.degree}</span>
                {/* <p>{roommate.country}, {roommate.region}</p>
                <p>About me: {roommate.aboutYou}</p> */}
            </div>
            <button className='connect'>View Profile</button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoommatesCarousel;
