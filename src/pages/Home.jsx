import { useState } from "react";
import { foods } from "../data/foods";
import { FaTruck, FaClock, FaLeaf, FaStar } from "react-icons/fa";

import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchFilter from "../components/SearchFilter";
import FoodGrid from "../components/FoodGrid";
import CartSidebar from "../components/CartSidebar";
import FloatingCart from "../components/FloatingCart";
import Footer from "../components/Footer";

function Home() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Rice Dishes", "Soups", "Swallows", "Grills", "Sides"];

  const addToCart = (food) => {
    const existingItem = cart.find((item) => item.id === food.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-green-50">
      <Header cart={cart} setShowCart={setShowCart} />

      <Hero />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="container mx-auto px-4 pb-10">
        <FoodGrid foods={filteredFoods} addToCart={addToCart} />
      </div>

      {/* Features Cards Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Naija Kitchen?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Fast Delivery Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl text-green-600 mb-4 flex justify-center">
                <FaTruck />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-center text-gray-600">Hot meals delivered to your door in minutes</p>
            </div>

            {/* Fresh Ingredients Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl text-blue-600 mb-4 flex justify-center">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Fresh Ingredients</h3>
              <p className="text-center text-gray-600">Locally sourced for authenticity and quality</p>
            </div>

            {/* Quick Service Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl text-orange-600 mb-4 flex justify-center">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Quick Service</h3>
              <p className="text-center text-gray-600">Order now and enjoy within 30 minutes</p>
            </div>

            {/* Highly Rated Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl text-yellow-600 mb-4 flex justify-center">
                <FaStar />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Highly Rated</h3>
              <p className="text-center text-gray-600">4.9★ from thousands of satisfied customers</p>
            </div>
          </div>
        </div>
      </section>

      {showCart && <CartSidebar cart={cart} setCart={setCart} setShowCart={setShowCart} />}

      <FloatingCart cart={cart} setShowCart={setShowCart} />

      <Footer />
    </div>
  );
}

export default Home;
