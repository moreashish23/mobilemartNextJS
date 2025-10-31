"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white shadow-lg px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link href="/" className="hover:text-cyan-300 transition duration-300">
            MobileMart
          </Link>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center text-lg font-medium">
          <Link
            href="/products"
            className="hover:text-cyan-300 transition duration-300 hover:scale-105"
          >
            Products
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-cyan-300 transition duration-300 hover:scale-105"
          >
            Dashboard
          </Link>
          <Link
            href="/admin"
            className="hover:text-cyan-300 transition duration-300 hover:scale-105"
          >
            Admin
          </Link>
          <Link
            href="/wishlist"
            className="hover:text-cyan-300 transition duration-300 hover:scale-105"
          >
            Wishlist
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none hover:scale-110 transition-transform duration-200"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden mt-3 space-y-3 bg-gradient-to-r from-[#243B55] to-[#141E30] rounded-lg p-4 text-base font-medium shadow-inner animate-fadeIn">
          <Link
            href="/products"
            className="hover:text-cyan-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/dashboard"
            className="hover:text-cyan-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/admin"
            className="hover:text-cyan-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
          <Link
            href="/wishlist"
            className="hover:text-cyan-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Wishlist
          </Link>
        </div>
      )}
    </nav>
  );
}
