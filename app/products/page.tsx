"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Filter products when user types
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.slug.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>All Products</h1>

      {/*  Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f1f1f1",
          borderRadius: "8px",
          padding: "8px 12px",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      >
        <FiSearch color="#666" size={20} style={{ marginRight: "8px" }} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            width: "100%",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                  height: "220px",
                }}
              />
              <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
              <p>₹{product.price}</p>
              <Link
                href={`/products/${product.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  color: "#0070f3",
                  textDecoration: "none",
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "30px", textAlign: "center", color: "#555" }}>
          No products found.
        </p>
      )}
    </div>
  );
}
