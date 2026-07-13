import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaSort, FaArrowLeft, FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";
import Pagination from "../components/Pagination";
import PageTransition from "../components/PageTransition";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const ITEMS_PER_PAGE = 6;

export default function Products() {
  const navigate = useNavigate();
  const { show, hide } = useLoading();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample products data with images
  const defaultProducts = [
    { id: 1, name: "Jollof Rice", price: 2500, category: "rice", rating: 4.8, reviews: 124, image: "https://kikifoodies.com/wp-content/uploads/2025/03/ET5B8958-4.jpeg", featured: true },
    { id: 2, name: "Fried Chicken", price: 3500, category: "protein", rating: 4.9, reviews: 256, image: "https://cjeatsrecipes.com/wp-content/uploads/2023/07/Easy-Fried-Chicken-on-a-plate.jpg", featured: true },
    { id: 3, name: "Moi Moi 2", price: 1500, category: "snacks", rating: 4.7, reviews: 89, image: "https://pulses.org/images/com_yoorecipe/422/moi-moi-rollup.jpg", featured: false },
    { id: 4, name: "Egusi Soup 2", price: 2000, category: "soups", rating: 4.6, reviews: 145, image: "https://cheflolaskitchen.com/wp-content/uploads/2018/06/Egusi-soup-Recipe-2-scaled.jpg", featured: false },
    { id: 5, name: "Suya 2", price: 2200, category: "protein", rating: 4.9, reviews: 312, image: "https://www.allrecipes.com/thmb/gDS9yte-01ySoy-LvCrLm998T1Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4619789-nigerian-suya-Avrile-Ngonga-4x3-1-521c46e035b149128577a25365173cab.jpg", featured: true },
    { id: 6, name: "Chin Chin", price: 1200, category: "snacks", rating: 4.5, reviews: 67, image: "https://cookingwithclaudy.com/wp-content/uploads/2023/11/20231109103244_IMG_6461-1.jpg", featured: false },
    { id: 7, name: "Pepper Soup", price: 1800, category: "soups", rating: 4.8, reviews: 178, image: "https://allnigerianfoods.com/wp-content/uploads/pepper-soup-recipe-500x500.jpg", featured: false },
    { id: 8, name: "Plantain Chips", price: 1000, category: "snacks", rating: 4.4, reviews: 92, image: "https://foreignfork.com/wp-content/uploads/2022/02/SweetPlantainChipsFEATURE.jpg", featured: false },
    { id: 9, name: "Beef Stew", price: 2800, category: "rice", rating: 4.7, reviews: 134, image: "https://static01.nyt.com/images/2024/10/28/multimedia/beef-stew-mlfk/beef-stew-mlfk-mediumSquareAt3X.jpg", featured: false },
    { id: 10, name: "Akara", price: 800, category: "snacks", rating: 4.6, reviews: 103, image: "https://www.mydiasporakitchen.com/wp-content/uploads/2023/11/IMG_2412.jpeg", featured: true },
    { id: 11, name: "Okra Soup", price: 1900, category: "soups", rating: 4.7, reviews: 156, image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Okro_soup_with_shrimps%2Cdried_fish%2Ccow_leg_and_tail_with_meat.jpg", featured: false },
    { id: 12, name: "Grilled Fish", price: 4000, category: "protein", rating: 4.9, reviews: 201, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj84bWOvomrFiKeQUdk4RYxEgNKS6PeZLY8Q&s", featured: true },
  ];

  const [allProducts, setAllProducts] = useState(defaultProducts);

  useEffect(() => {
    let mounted = true;
    (async () => {
      show("Loading products...");
      try {
        const res = await fetch("/api/foods.php");
        const data = await res.json();
        if (mounted) setAllProducts(data?.products || defaultProducts);
      } catch (e) {
        if (mounted) setAllProducts(defaultProducts);
      } finally {
        // ensure loader shows for at least 5 seconds
        await delay(5000);
        if (mounted) hide();
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        selectedPrice === "all" ||
        (selectedPrice === "cheap" && product.price < 1500) ||
        (selectedPrice === "mid" && product.price >= 1500 && product.price < 3000) ||
        (selectedPrice === "expensive" && product.price >= 3000);
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort
    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "popular") filtered.sort((a, b) => b.reviews - a.reviews);

    return filtered;
  }, [searchTerm, selectedCategory, selectedPrice, sortBy, allProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const categories = [
    { id: "all", label: "All", count: allProducts.length },
    { id: "rice", label: "Rice Dishes", count: allProducts.filter(p => p.category === "rice").length },
    { id: "protein", label: "Proteins", count: allProducts.filter(p => p.category === "protein").length },
    { id: "soups", label: "Soups", count: allProducts.filter(p => p.category === "soups").length },
    { id: "snacks", label: "Snacks", count: allProducts.filter(p => p.category === "snacks").length },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <button onClick={() => {
            (async () => {
              try {
                show("Going back...");
                await delay(3000);
                navigate("/");
              } finally {
                hide();
              }
            })();
          }} className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4 bg-none border-none cursor-pointer">
            <FaArrowLeft /> Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Our Products</h1>
          <p className="text-gray-600 dark:text-gray-400">{filteredProducts.length} delicious items available (Showing {paginatedProducts.length} on this page)</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8 space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-bold text-gray-800 dark:text-white mb-2 block">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-green-600" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 outline-none transition"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaFilter /> Categories
                </label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === cat.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.label}</span>
                        <span className="text-xs bg-black bg-opacity-20 px-2 py-1 rounded">{cat.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-bold text-gray-800 dark:text-white mb-3 block">Price Range</label>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "cheap", label: "Below ₦1,500" },
                    { id: "mid", label: "₦1,500 - ₦3,000" },
                    { id: "expensive", label: "Above ₦3,000" },
                  ].map((price) => (
                    <button
                      key={price.id}
                      onClick={() => setSelectedPrice(price.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedPrice === price.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {price.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <FaSort /> Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 outline-none transition"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedPrice("all");
                  setSortBy("popular");
                }}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-4">No products found matching your filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedPrice("all");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -10 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
                    >
                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ⭐ Featured
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <button className="absolute top-3 right-3 bg-white dark:bg-gray-700 hover:bg-red-600 hover:text-white text-gray-800 dark:text-gray-300 p-2 rounded-full transition-all shadow-lg hover:scale-110">
                          <FaHeart />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-green-600 transition">{product.name}</h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">({product.reviews})</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-2xl font-bold text-green-600">₦{product.price.toLocaleString()}</p>
                        </div>

                        {/* Add to Cart */}
                        <motion.button
                          onClick={async () => {
                            show("Adding to cart...");
                            await delay(5000);
                            hide();
                            addToast(`${product.name} added to cart!`, "success");
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full mt-4 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <FaShoppingCart /> Add to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    </PageTransition>
  );
}
