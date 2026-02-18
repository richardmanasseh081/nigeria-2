import { useState } from "react";
import { foods } from "../data/foods";

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

      {showCart && <CartSidebar cart={cart} setCart={setCart} setShowCart={setShowCart} />}

      <FloatingCart cart={cart} setShowCart={setShowCart} />

      <Footer />
    </div>
  );
}

export default Home;
