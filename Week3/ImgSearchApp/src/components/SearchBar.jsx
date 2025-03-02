const SearchBar = ({ query, handleSearch }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-md">
        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for images...🔎"
          className="w-full pl-10 pr-4 py-2 border border-black rounded-lg shadow-sm bg-black bg-opacity-30 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;