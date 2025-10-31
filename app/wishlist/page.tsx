"use client";

import React from "react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Wishlist </h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your wishlist is empty.</p>
          <Link href="/products" className="text-blue-600 hover:underline mt-2 inline-block">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item: any) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="w-full h-44 relative rounded-xl overflow-hidden">
                { (item.images?.[0] ?? item.image) ? (
                  <Image
                    src={item.images?.[0] ?? item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover"
                  />
                ) : (
                  <img src="/placeholder.png" alt={item.name} className="w-full h-full object-cover" />
                )}
              </div>

              <h2 className="mt-3 text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-2">₹{item.price}</p>

              <div className="mt-auto flex gap-2">
                <Link href={`/products/${item.slug ?? item._id}`} className="flex-1">
                  <button className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                    View
                  </button>
                </Link>

                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
