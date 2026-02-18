import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

function FoodCard({ food, addToCart }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.some(item => item.id === food.id));
  }, [food.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isWishlisted) {
      const updated = wishlist.filter(item => item.id !== food.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    } else {
      wishlist.push(food);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-700 rounded-full p-2 hover:scale-110 transition-all shadow-md"
      >
        <FaHeart className={`text-xl ${isWishlisted ? "text-red-600" : "text-gray-300"}`} />
      </button>

      <motion.img
        src={food.image}
        alt={food.name}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold dark:text-white">{food.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{food.description}</p>
        <p className="text-green-600 dark:text-green-400 font-semibold mt-2">₦{food.price}</p>
        <button
          onClick={() => addToCart(food)}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export default FoodCard;
