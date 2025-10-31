"use client";

import Link from "next/link";
import Image from "next/image";
import AddToWishlist from "../app/recommendations/AddToWishlist";

export default function ProductCard({ product }) {
  if (!product) {
    console.error("No product passed to ProductCard");
    return null;
  }

  // Safe product path
  const productPath =
    product.slug && String(product.slug).trim() !== ""
      ? product.slug
      : product._id
      ? String(product._id)
      : "";

  // Safe image fallback
  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image
      ? product.image
      : "/placeholder.png";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center p-4 sm:p-5 md:p-6 w-full max-w-sm mx-auto hover:scale-[1.02]">
      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center w-full">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h3>

        <p className="text-gray-600 mt-1 text-base md:text-lg font-medium">
          ₹{product.price}
        </p>

        <Link
          href={`/products/${productPath}`}
          className="inline-block text-indigo-600 font-medium hover:text-indigo-700 mt-2 transition-colors duration-200"
        >
          View Details 
        </Link>
      </div>

      {/* Add to Wishlist */}
      <div className="w-full mt-4">
        <AddToWishlist product={product} />
      </div>
    </div>
  );
}
