"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  slug: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  //  Fetch products at build time (static-like)
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", { next: { revalidate: 60 } });
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    }
    fetchProducts();
  }, []);

  //  Handle search filter
  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, products]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>

      {/*  Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-4 py-2 w-full max-w-md"
        />
      </div>

      {/*  Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            No products found.
          </p>
        ) : (
          filtered.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-1">{product.category}</p>
                <p className="text-blue-600 font-semibold mt-2">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
