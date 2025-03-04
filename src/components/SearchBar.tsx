// src/components/SearchBar.tsx
"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search coins..."
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("");
            onSearch("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  );
}
