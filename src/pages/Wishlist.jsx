import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaArrowLeft, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useLoading } from "../context/LoadingContext";

export default function Wishlist() {
  const navigate = useNavigate();
  const { show, hide } = useLoading();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);
    setLoading(false);
  }, [navigate]);

  const removeFromWishlist = (foodId) => {
    const updated = wishlist.filter(item => item.id !== foodId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(item => item.id === food.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${food.name} added to cart!`);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8\">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => {
            const delay = (ms) => new Promise((r) => setTimeout(r, ms));
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FaHeart className="text-red-600" /> My Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{wishlist.length} items in your wishlist</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <FaHeart className="text-6xl text-red-400 mx-auto mb-4 opacity-20" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Add items to your wishlist by clicking the heart icon on food cards</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105">
              <FaShoppingCart /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {wishlist.map((food, index) => (
              <div
                key={food.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48 bg-gray-200 dark:bg-gray-700">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(food.id)}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all hover:scale-110"
                  >
                    <FaTrash />
                  </button>
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                    <FaHeart /> Saved
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{food.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{food.description}</p>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-green-600 dark:text-green-400 font-bold text-lg">₦{food.price}</p>
                      {food.rating && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">★ {food.rating} ({food.reviews || 0} reviews)</p>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(food)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(food.id)}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg font-semibold transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Move to Cart CTA */}
        {wishlist.length > 0 && (
          <div className="bg-linear-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg p-6 text-center\">
            <h3 className="text-2xl font-bold mb-2">Ready to order?</h3>
            <p className="mb-4">Add items to your cart and checkout</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-all hover:scale-105">
              <FaShoppingCart /> Continue Shopping
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
