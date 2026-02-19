import { useState, useEffect } from "react";
import { Search } from "lucide-react";

function SearchFilter({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  onFilterChange = null,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Common food items for autocomplete
  const commonFoods = [
    "Jollof Rice", "Fried Rice", "Fried Chicken", "Egusi Soup",
    "Pepper Soup", "Moi Moi", "Akara", "Suya", "Chin Chin",
    "Plantain Chips", "Okra Soup"
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = commonFoods.filter((food) =>
        food.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white p-4 rounded shadow space-y-4">
        {/* Search Bar with Autocomplete */}
        <div className="relative">
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm && setShowSuggestions(true)}
              className="flex-1 bg-transparent outline-none dark:text-white"
            />
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition first:rounded-t-lg last:rounded-b-lg dark:text-white"
                >
                  <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Category Buttons */}
        <div className="flex gap-2 flex-wrap pt-2">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
