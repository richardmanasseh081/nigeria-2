import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useLoading } from "../context/LoadingContext";

function CartSidebar({ cart, setCart, setShowCart }) {
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
      <div
        className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setShowCart(false)}>
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded"
              >
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-green-600 font-bold">
                    ₦{item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-gray-300 p-1 rounded"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-6 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-green-600 text-white p-1 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex-shrink-0">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span className="text-green-600">
              ₦{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* ✅ CHECKOUT LINK */}
         <button
                onClick={async () => {
                  if (cart.length === 0) return;
                  show("Proceeding to checkout...");
                  await new Promise((r) => setTimeout(r, 3000));
                  hide();
                  navigate('/checkout', { state: { cart } });
                }}
                className="block w-full text-center mt-4 bg-green-600 text-white py-2 rounded"
    >
                 Checkout
        </button>

        </div>
      </div>
    </div>
  );
}

export default CartSidebar;
