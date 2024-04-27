
import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the CSS file here
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { EffectCube, Pagination, Autoplay } from 'swiper/modules';

const Carousel = ({ slides, autoSlideInterval = 3000 }) => {

  return (
    <>
      <div className='carousel-wrapper'>
        <Swiper
          modules={[EffectCube, Pagination, Autoplay]}
          effect={'cube'}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={true}
          autoplay={{
            delay: 2000, 
            disableOnInteraction: false, 
          }}
          loop={true}
          className="banner-swiper"
        >
          {slides.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} />
            </SwiperSlide>))
          }
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
