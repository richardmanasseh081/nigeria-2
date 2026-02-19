import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

function FoodCard({ food, addToCart }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.some(item => item.id === food.id));
  }, [food.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isWishlisted) {
      const updated = wishlist.filter(item => item.id !== food.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      addToast("Removed from wishlist", "info");
    } else {
      wishlist.push(food);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      addToast("Added to wishlist ❤️", "success");
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    addToCart(food);
    addToast(`${food.name} added to cart`, "success");
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Wishlist Badge */}
      {isWishlisted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 left-3 z-20 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
        >
          ♥ Wishlisted
        </motion.div>
      )}

      {/* Wishlist Button */}
      <motion.button
        onClick={toggleWishlist}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-700 rounded-full p-2 hover:scale-110 transition-all shadow-md"
      >
        <motion.div
          animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaHeart className={`text-xl ${isWishlisted ? "text-red-600" : "text-gray-300"}`} />
        </motion.div>
      </motion.button>

      <motion.img
        src={food.image}
        alt={food.name}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold dark:text-white">{food.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{food.description}</p>
        <p className="text-green-600 dark:text-green-400 font-semibold mt-2">₦{food.price}</p>
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default FoodCard;
