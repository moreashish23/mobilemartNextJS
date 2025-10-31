"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center justify-center w-full mb-6">
      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-xl shadow-sm px-4 py-2">
        <FiSearch className="text-gray-500 mr-2" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
          className="bg-transparent outline-none w-full text-gray-700"
        />
      </div>
    </div>
  );
};

export default SearchBar;
