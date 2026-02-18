import { useLocation } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

function Checkout() {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const payWithPaystack = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    const startPay = async () => {
      const delay = (ms) => new Promise((r) => setTimeout(r, ms));
      const loaderMsg = "Initializing payment...";
      try {
        // show loader for at least 3s before invoking Paystack
        window.dispatchEvent(new CustomEvent('show-loader', { detail: loaderMsg }));
        await delay(3000);
      } finally {
        window.dispatchEvent(new CustomEvent('hide-loader'));
      }

      const handler = window.PaystackPop.setup({
        key: "pk_live_d0027d2f028205f2b2eeab6bae13dbf9576d4a6f", // 🔴 REPLACE WITH YOUR KEY
        email: "customer@email.com",
        amount: totalAmount * 100, // kobo
        currency: "NGN",
        ref: "ORDER_" + Date.now(),

        callback: function (response) {
          alert("Payment successful!");
          console.log("Payment reference:", response.reference);
        },

        onClose: function () {
          alert("Payment cancelled");
        },
      });

      handler.openIframe();
    };

    startPay();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{totalAmount.toLocaleString()}</span>
            </div>

            <button
              onClick={payWithPaystack}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold"
            >
              Pay with Paystack
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;
