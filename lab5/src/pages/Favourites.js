import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, ListGroup, Image, Button } from "react-bootstrap";
import { FavouritesContext } from "../context/FavouritesContext";

const Favourites = () => {
  const { items, remove } = useContext(FavouritesContext);
  return (
    <Container>
      <h2>My Favourites</h2>
      {items.length === 0 ? (
        <p>
          No favourites yet. <Link to="/products">Browse products</Link>
        </p>
      ) : (
        <ListGroup>
          {items.map((p) => (
            <ListGroup.Item key={p.id} className="d-flex align-items-center">
              <Image src={p.image} alt={p.title} width={80} thumbnail />
              <div className="ms-3">
                <h5>{p.title}</h5>
                <p>${p.price.toFixed(2)}</p>
              </div>
              <div className="ms-auto">
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => remove(p.id)}
                >
                  Remove
                </Button>
                <Link to={`/products/${p.id}`}>
                  <Button variant="info">View</Button>
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Favourites;
