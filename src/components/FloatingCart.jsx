import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useLoading } from "../context/LoadingContext";
import { motion } from "framer-motion";

export default function FloatingCart({ cart, setShowCart }) {
  const { show, hide } = useLoading();

  const handleClick = async () => {
    show("Opening cart...");
    await new Promise((r) => setTimeout(r, 3000));
    hide();
    setShowCart(true);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all"
      title="Open Cart"
    >
      <FaShoppingCart className="text-2xl" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
          {cart.length}
        </span>
      )}
    </motion.button>
  );
}
