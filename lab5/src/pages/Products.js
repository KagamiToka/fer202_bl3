import React, { useMemo, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { Container, Row, Col, Form } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [priceFilter, setPriceFilter] = useState("all");
  const { isDark } = useContext(ThemeContext);

  const visible = useMemo(() => {
    let list = products;
    const keyword = search.trim().toLowerCase();
    if (keyword)
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          (p.description || "").toLowerCase().includes(keyword)
      );
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      list = list.filter(
        (p) => p.price >= min && (Number.isNaN(max) ? true : p.price <= max)
      );
    }
    if (sortKey === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortKey === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [search, sortKey, priceFilter]);

  return (
    <Container className={`py-4 ${isDark ? "theme-dark" : "theme-light"}`}>
      <h2 className="text-center mb-4">Products</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="mb-2"
          >
            <option value="all">All prices</option>
            <option value="0-2">$0 - $2</option>
            <option value="2-3">$2 - $3</option>
            <option value="3-999">$3+</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="price-asc">Price asc</option>
            <option value="price-desc">Price desc</option>
          </Form.Select>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {visible.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;