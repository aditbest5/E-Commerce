import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
        className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300'
      />
      <button
        type='submit'
        className='ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>
        Search
      </button>
    </form>
  );
};

export default Search;
