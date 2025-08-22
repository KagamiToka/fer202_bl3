import React from "react";
import { Container } from "react-bootstrap";
import Carousel from "../components/Carousel";

const Home = () => {
  const images = [
    "/images/pizza.jpg",
    "/images/PinkCake01.webp",
    "/images/xkUElXq.jpg",
  ];
  return (
    <Container>
      <h2>Welcome to FoodStore</h2>
      <Carousel images={images} autoPlay={true} />
    </Container>
  );
};

export default Home;
