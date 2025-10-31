"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext"; // your existing JS context is fine
import { useParams } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price?: number;
  category?: string;
  description?: string;
  images?: string[];
  image?: string;
  slug?: string;
  [key: string]: any;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const idOrSlug = params?.idOrSlug as string | undefined;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (!idOrSlug) return;

    let mounted = true;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${encodeURIComponent(idOrSlug)}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        if (mounted) setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      mounted = false;
    };
  }, [idOrSlug]);

  if (loading) return <div className="p-6 text-center">Loading product...</div>;
  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  const imageSrc = product.images?.[0] ?? product.image ?? "/placeholder.png";
  const already = isInWishlist ? isInWishlist(product._id) : false;

  const handleWishlist = () => {
    if (already) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {/* Use next/image — if remote domains not configured, fallback to <img> */}
          <Image
            src={imageSrc}
            alt={product.name}
            width={600}
            height={450}
            className="rounded-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.category && <p className="text-gray-600 mt-2">{product.category}</p>}
          <p className="text-2xl text-blue-600 font-semibold mt-3">₹{product.price}</p>
          {product.description && <p className="mt-4 text-gray-700">{product.description}</p>}

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleWishlist}
              className={`px-6 py-2 rounded-md text-white transition ${
                already ? "bg-gray-500 hover:bg-gray-600" : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {already ? "Remove from Wishlist " : "Add to Wishlist ♡"}
            </button>
            <a
              href="/wishlist"
              className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Go to Wishlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
