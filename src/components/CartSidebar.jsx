import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";

function CartSidebar({ cart, setCart, setShowCart }) {
  const { addToast } = useToast();

  const updateQuantity = (id, change) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      addToast(`Removed ${item.name} from cart`, "info");
    }
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const { show, hide } = useLoading();

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      onClick={() => setShowCart(false)}
    >
      <motion.div
        className="fixed right-0 top-0 h-full w-full md:w-96 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center flex-shrink-0 bg-green-50 dark:bg-gray-700">
          <h2 className="text-2xl font-bold dark:text-white">Your Cart</h2>
          <motion.button
            onClick={() => setShowCart(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="dark:text-white" />
          </motion.button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-md transition"
              >
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold dark:text-white">{item.name}</h4>
                  <p className="text-green-600 dark:text-green-400 font-bold">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white dark:bg-gray-600 rounded-lg p-1">
                  <motion.button
                    onClick={() => updateQuantity(item.id, -1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 p-1 rounded transition"
                  >
                    <Minus size={14} />
                  </motion.button>

                  <motion.span
                    key={item.quantity}
                    animate={{ scale: [1, 1.2, 1] }}
                    className="w-6 text-center font-bold dark:text-white"
                  >
                    {item.quantity}
                  </motion.span>

                  <motion.button
                    onClick={() => updateQuantity(item.id, 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-600 hover:bg-green-700 text-white p-1 rounded transition"
                  >
                    <Plus size={14} />
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => removeFromCart(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </motion.button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-between text-lg font-bold mb-4 dark:text-white">
            <span>Total ({cart.length} items)</span>
            <span className="text-green-600 dark:text-green-400">
              ₦{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* ✅ CHECKOUT LINK */}
          <motion.button
            onClick={async () => {
              if (cart.length === 0) return;
              show("Proceeding to checkout...");
              await new Promise((r) => setTimeout(r, 3000));
              hide();
              navigate('/checkout', { state: { cart } });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            Proceed to Checkout
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}

export default CartSidebar;
