import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value.trim());
  };

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="tools flex justify-end py-5">
      <div className="flex w-full md:w-80 max-w-md mx-auto sm:mx-0">
        <input
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Recherche par auteur..."
          type="search"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-600 text-white p-4 rounded-r hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
        >
          <FiSearch />
        </button>
      </div>
    </div>
  );
}
