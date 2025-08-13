import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-success text-white py-3 mt-4 shadow-lg">
      <Container className="text-center">
        <small className="fw-semibold">
          Made with ❤️ and 🥗 | Healthy Recipe Finder © {new Date().getFullYear()}
        </small>
      </Container>
    </footer>
  );
}
