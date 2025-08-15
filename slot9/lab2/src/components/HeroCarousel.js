import React from 'react';
import { Carousel } from 'react-bootstrap';

const HeroCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/images/movie1.jpg',
      title: 'Galactic Wars',
      description: 'Epic space battles decide the fate of a fractured galaxy'
    },
    {
      id: 2,
      image: '/images/movie2.jpg',
      title: 'Laugh Out Loud',
      description: 'A feel-good comedy about friendship and second chances'
    },
    {
      id: 3,
      image: '/images/movie3.jpg',
      title: 'Deep Blue',
      description: 'A gripping survival drama set far from shore'
    }
  ];

  return (
    <Carousel className="hero-carousel mb-4">
      {carouselItems.map((item) => (
        <Carousel.Item key={item.id}>
          <div 
            className="carousel-image-container"
            style={{
              height: '400px',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#333' // Fallback color
            }}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
