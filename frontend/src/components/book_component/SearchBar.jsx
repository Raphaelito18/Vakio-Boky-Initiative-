import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  return (
    <div className="tools flex justify-end py-5">
      <div className="flex w-full md:w-80 max-w-md mx-auto sm:mx-0">
        <input
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Recherche..."
          type="search"
        />
        <button className="bg-blue-600  text-white p-4 rounded-r hover:bg-blue-700 transition-colors">
          <FiSearch />
        </button>
      </div>
    </div>
  );
}
