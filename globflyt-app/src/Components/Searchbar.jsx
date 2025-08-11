import React, { useEffect, useRef, useState } from 'react';

function Searchbar({ searchTerm, setSearchTerm, handleSearch, isLoading }) {
  const searchRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [initialOffset, setInitialOffset] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const currentOffset = searchRef.current.getBoundingClientRect().top + window.scrollY;

        if (initialOffset === null) {
          setInitialOffset(currentOffset);
        }

        if (window.scrollY > initialOffset) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialOffset]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      ref={searchRef}
      className={`z-50 transition-all duration-300 ease-in-out ${
        isSticky ? ' fixed top-0 right-0 rounded-l-sm w-full h-20 bg-pink-900 shadow-lg' : 'absolute -bottom-[25rem] -right-9'
      }`}
    >
      <div className="max-w-md mx-auto flex justify-end p-2">
        <input
          type="text"
          placeholder="City, Region, Country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-60 bg-opacity-70 px-4 text-zinc-100 placeholder-white bg-slate-800 absolute right-24 rounded-s-3xl h-10 mr-2"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="h-10 w-20 bg-slate-800 absolute rounded-r-full right-10 hover:bg-blue-800 text-zinc-100 bg-opacity-100"
        >
          Search
        </button>
      </div>

      {isLoading && (
        <div className="absolute right-0 w-full flex justify-center items-center">
          <div className="loader border-t-4 border-pink-700 border-solid rounded-full w-6 h-6 animate-spin"></div>
          <span className="ml-2 text-pink-700">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
