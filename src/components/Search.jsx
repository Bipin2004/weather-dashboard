import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs sm:max-w-md mb-4 sm:mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-gray-800 bg-white bg-opacity-80 dark:bg-gray-700 dark:text-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300 text-sm sm:text-base"
      />
      <button
        type="submit"
        className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 shadow-md transition-all duration-300 text-sm sm:text-base"
      >
        Search
      </button>
    </form>
  );
};

export default Search;