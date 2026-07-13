import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBox, FaArrowLeft, FaTruck, FaCheckCircle, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useLoading } from "../context/LoadingContext";

export default function OrderTracking() {
  const navigate = useNavigate();
  const { show, hide } = useLoading();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Sample orders with tracking data
    const sampleOrders = [
      {
        id: "#ORD001",
        date: "Mar 15, 2024",
        total: "₦5,500",
        items: 3,
        status: "Delivered",
        currentStep: 4,
        steps: [
          { step: 1, label: "Order Confirmed", date: "Mar 15, 10:30 AM", completed: true },
          { step: 2, label: "Processing", date: "Mar 15, 11:00 AM", completed: true },
          { step: 3, label: "Shipped", date: "Mar 15, 2:00 PM", completed: true },
          { step: 4, label: "Delivered", date: "Mar 16, 4:30 PM", completed: true },
        ],
        location: "123 Lagos Street, Lagos",
      },
      {
        id: "#ORD002",
        date: "Mar 10, 2024",
        total: "₦3,200",
        items: 2,
        status: "In Transit",
        currentStep: 3,
        steps: [
          { step: 1, label: "Order Confirmed", date: "Mar 10, 9:00 AM", completed: true },
          { step: 2, label: "Processing", date: "Mar 10, 10:30 AM", completed: true },
          { step: 3, label: "Shipped", date: "Mar 11, 8:00 AM", completed: true },
          { step: 4, label: "Delivered", date: "Today", completed: false },
        ],
        location: "456 Ibadan Road, Ibadan",
      },
      {
        id: "#ORD003",
        date: "Mar 5, 2024",
        total: "₦4,800",
        items: 4,
        status: "Processing",
        currentStep: 2,
        steps: [
          { step: 1, label: "Order Confirmed", date: "Mar 5, 3:00 PM", completed: true },
          { step: 2, label: "Processing", date: "Mar 5, 4:00 PM", completed: true },
          { step: 3, label: "Shipped", date: "Tomorrow", completed: false },
          { step: 4, label: "Delivered", date: "TBD", completed: false },
        ],
        location: "789 Abuja Avenue, Abuja",
      },
    ];

    setOrders(sampleOrders);
    if (sampleOrders.length > 0) {
      setSelectedOrder(sampleOrders[0]);
    }
  }, [navigate]);

  if (!user) return <div className="text-center py-20">Loading...</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      case "In Transit":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      case "Processing":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-green-600 text-2xl" />;
      case "In Transit":
        return <FaTruck className="text-blue-600 text-2xl" />;
      case "Processing":
        return <FaClock className="text-yellow-600 text-2xl" />;
      default:
        return <FaBox className="text-gray-600 text-2xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
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
            <FaBox className="text-green-600" /> Order Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track your orders in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your Orders</h2>
              <div className="space-y-2">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedOrder?.id === order.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    <p className="font-bold">{order.id}</p>
                    <p className="text-xs opacity-75">{order.date}</p>
                    <p className={`text-xs font-semibold mt-1 ${
                      selectedOrder?.id === order.id ? "" : 
                      order.status === "Delivered" ? "text-green-600 dark:text-green-400" :
                      order.status === "In Transit" ? "text-blue-600 dark:text-blue-400" :
                      "text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {order.status}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedOrder && (
              <>
                {/* Order Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedOrder.id}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{selectedOrder.date}</p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      {getStatusIcon(selectedOrder.status)}
                      <div>
                        <p className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                      <p className="text-2xl font-bold text-green-600">{selectedOrder.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Number of Items</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{selectedOrder.items}</p>
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Delivery Location</p>
                      <p className="text-gray-800 dark:text-white">{selectedOrder.location}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Tracking Timeline</h3>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-300 dark:bg-gray-600"></div>

                    {/* Timeline Steps */}
                    <div className="space-y-6">
                      {selectedOrder.steps.map((item, index) => (
                        <div key={item.step} className="relative pl-16">
                          {/* Timeline Dot */}
                          <div
                            className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                              item.completed
                                ? "bg-green-600 border-green-200 dark:border-green-800 text-white"
                                : "bg-gray-300 dark:bg-gray-600 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {item.completed ? "✓" : item.step}
                          </div>

                          {/* Content */}
                          <div className={item.completed ? "" : "opacity-50"}>
                            <h4 className={`font-bold text-lg ${
                              item.completed
                                ? "text-gray-800 dark:text-white"
                                : "text-gray-600 dark:text-gray-400"
                            }`}>
                              {item.label}
                            </h4>
                            <p className={`text-sm ${
                              item.completed
                                ? "text-gray-600 dark:text-gray-400"
                                : "text-gray-500 dark:text-gray-500"
                            }`}>
                              {item.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="bg-linear-to-r from-green-600 to-green-700 text-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-bold mb-2">Estimated Delivery</h3>
                  <p className="text-lg opacity-90 mb-4">
                    {selectedOrder.status === "Delivered"
                      ? "Your order has been delivered"
                      : selectedOrder.status === "In Transit"
                      ? "Expected today"
                      : "Tomorrow by 6:00 PM"}
                  </p>
                  {selectedOrder.status !== "Delivered" && (
                    <button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105">
                      Get Updates
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
