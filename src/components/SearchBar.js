const SearchBar = ({ onSearch }) => {
    return (
        <div className="flex items-center mb-6">
            <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm"
                placeholder="Search orders..."
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className="ml-4 p-2 bg-navy text-white rounded-lg flex items-center">
                <i className="fas fa-search"></i>
            </button>
        </div>
    );
  };
  
  export default SearchBar;
  