import React, { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ToastContext } from "../context/ToastContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useContext(CartContext);
  const { items: favItems, toggle } = useContext(FavouritesContext);
  const { pushToast } = useContext(ToastContext);

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id]
  );
  const isFaved = useMemo(
    () => favItems.some((i) => i.id === product?.id),
    [favItems, product]
  );

  if (!product)
    return (
      <Container>
        <p>Product not found.</p>
      </Container>
    );

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.title} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4>${product.price.toFixed(2)}</h4>
          <div className="mt-3">
            <Button
              variant="primary"
              onClick={() => {
                add(product);
                pushToast("Added to cart", "success");
              }}
            >
              Add to Cart
            </Button>{" "}
            <Button variant="secondary" onClick={() => navigate("/products")}>
              Back to List
            </Button>{" "}
            {isFaved ? (
              <Button
                variant="outline-info"
                onClick={() => navigate("/favourites")}
              >
                Browse Favourites
              </Button>
            ) : (
              <Button
                variant="outline-warning"
                onClick={() => {
                  toggle(product);
                  pushToast("Added to favourites", "info");
                }}
              >
                Add to Favourite
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
