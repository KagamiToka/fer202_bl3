import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ToastContext } from "../context/ToastContext";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const { add } = useContext(CartContext);
  const { items: favItems, toggle } = useContext(FavouritesContext);
  const { pushToast } = useContext(ToastContext);

  const isFaved = useMemo(() => favItems.some((i) => i.id === product.id), [favItems, product.id]);

  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "10px" }}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-center">{product.title}</Card.Title>
          <Card.Text className="text-center mb-3">
            ${product.price.toFixed(2)}
          </Card.Text>
        </div>
        <div className="d-grid gap-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            View Details
          </Link>
          <Button
            variant="primary"
            className="btn-sm"
            onClick={() => {
              add(product);
              pushToast("Added to cart", "success");
            }}
          >
            Add to Cart
          </Button>
          {isFaved ? (
            <Link
              to="/favourites"
              className="btn btn-outline-info btn-sm"
            >
              Browse to My Favourite
            </Link>
          ) : (
            <Button
              variant="outline-warning"
              className="btn-sm"
              onClick={() => {
                toggle(product);
                pushToast("Added to favourites", "info");
              }}
            >
              Add to Favourite
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;