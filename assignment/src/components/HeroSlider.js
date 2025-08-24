import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

function HeroSlider() {
  const slides = [
    { image: 'images/download (18).jpg', alt: 'Banner 1' },
    { image: 'images/download (19).jpg', alt: 'Banner 2' },
    { image: 'images/download (20).jpg', alt: 'Banner 3' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [paused, slides.length]);

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={(index) => setActiveIndex(index)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mb-3"
    >
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={slide.image} alt={slide.alt} style={{ objectFit: 'cover', height: '300px' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroSlider;