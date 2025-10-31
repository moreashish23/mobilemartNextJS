"use client";
import { useEffect, useState } from "react";

export default function AddToWishlist({ product }) {
  const [added, setAdded] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAdded = wishlist.some((item) => item._id === product._id);
    setAdded(isAdded);
  }, [product._id]);

  const handleAdd = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyAdded = wishlist.some((item) => item._id === product._id);

    if (isAlreadyAdded) {
      setAdded(true);
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setAdded(true);

    // Smooth toast-style feedback
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleAdd}
        disabled={added}
        className={`w-full mt-3 py-2.5 rounded-lg font-semibold tracking-wide text-white transition-all duration-300 ease-in-out shadow-md ${
          added
            ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 hover:shadow-lg hover:scale-[1.02]"
        }`}
      >
        {added ? "Added to Wishlist " : "Add to Wishlist ♡"}
      </button>

      {/* Small floating toast animation */}
      {showMsg && (
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1 px-3 rounded-full shadow-md animate-fadeInOut">
          {product.name} added 
        </div>
      )}

      {/* Toast Animation */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
