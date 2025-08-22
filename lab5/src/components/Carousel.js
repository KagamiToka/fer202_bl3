import React, { useState, useContext } from "react";
import { Carousel as BootstrapCarousel } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

const Carousel = ({ images, autoPlay = true, delayMs = 2500 }) => {
  const [index, setIndex] = useState(0);
  const { isDark } = useContext(ThemeContext);
  const safeImages = images?.filter(Boolean) || [];

  if (safeImages.length === 0) return null;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <BootstrapCarousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={autoPlay ? delayMs : null}
      className={`mb-4 ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}
      variant={isDark ? "dark" : "light"}
    >
      {safeImages.map((src, i) => (
        <BootstrapCarousel.Item key={i}>
          <img
            src={src}
            className="d-block w-100"
            alt={`slide-${i}`}
            style={{ objectFit: "cover", height: "400px" }}
          />
          <BootstrapCarousel.Caption>
            
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
};

export default Carousel;