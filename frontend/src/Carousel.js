
import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the CSS file here
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

const Carousel = ({ slides, autoSlideInterval = 3000 }) => {

  return (
    <>
      <div className='carousel-wrapper'>
        <Swiper
          modules={[EffectFade, Pagination, Autoplay]}
          effect={'fade'}
          grabCursor={true}
          speed={3000}
          pagination={true}
          autoplay={{
            delay: 500, 
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
