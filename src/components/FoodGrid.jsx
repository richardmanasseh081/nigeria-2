import FoodCard from "./FoodCard";

function FoodGrid({ foods, addToCart }) {
  if (foods.length === 0) {
    return <p className="text-center text-gray-500">No food found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default FoodGrid;
