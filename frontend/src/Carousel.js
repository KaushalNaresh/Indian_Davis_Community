
import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Import the CSS file here

const Carousel = ({ slides, autoSlideInterval = 3000 }) => {

  console.log('Carousel component is rendered with slides:', slides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, autoSlideInterval);

    return () => clearInterval(slideTimer);
  }, [isHovering, slides.length, autoSlideInterval]);

  return (
    <div className='carousel-wrapper'>
      {slides.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={index === currentSlide ? 'carousel-image active' : 'carousel-image'}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transform: isHovering && index === currentSlide ? 'scale(1.1)' : 'scale(1)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
          }}
        />
      ))}
    </div>
  );
};

export default Carousel;
