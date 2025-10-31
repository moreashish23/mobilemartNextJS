"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white py-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* --- Brand Section --- */}
        <div>
          <h2 className="text-2xl font-bold mb-3">MobileMart</h2>
          <p className="text-gray-200 text-sm leading-relaxed">
            Your trusted destination for premium smartphones and accessories. 
            Discover the latest models, compare prices, and shop with confidence.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link href="/" className="hover:text-gray-100 hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:text-gray-100 hover:underline">Products</Link></li>
            <li><Link href="/wishlist" className="hover:text-gray-100 hover:underline">Wishlist</Link></li>
            <li><Link href="/dashboard" className="hover:text-gray-100 hover:underline">Dashboard</Link></li>
            <li><Link href="/admin" className="hover:text-gray-100 hover:underline">Admin</Link></li>
          </ul>
        </div>

        {/* --- Support / Info --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-gray-200">
            <li><a href="#" className="hover:text-gray-100 hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-100 hover:underline">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-gray-100 hover:underline">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-gray-100 hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* --- Contact / Socials --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <p className="text-gray-200 text-sm flex items-center gap-2 mb-2">
            <FaEnvelope className="text-gray-100" /> support@mobilemart.com
          </p>
          <p className="text-gray-200 text-sm flex items-center gap-2 mb-4">
            <FaPhoneAlt className="text-gray-100" /> +91 98765 43210
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
            <a href="https://github.com/moreashish23" target="_blank" className="hover:text-gray-300"><FaGithub /></a>
          </div>
        </div>
      </div>

      <hr className="border-gray-400 my-8" />

      <div className="text-center text-gray-200 text-sm">
        	&copy; {new Date().getFullYear()} <span className="font-semibold">MobileMart</span>. All rights reserved.
      </div>
    </footer>
  );
}
