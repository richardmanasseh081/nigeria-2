import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaClock, FaExclamationCircle, FaFilter, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Orders() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const allOrders = [
    { id: "#ORD001", date: "Mar 15, 2024", items: 3, total: "₦5,500", status: "Delivered", tracking: "Arrived yesterday" },
    { id: "#ORD002", date: "Mar 10, 2024", items: 2, total: "₦3,200", status: "In Transit", tracking: "Out for delivery" },
    { id: "#ORD003", date: "Mar 5, 2024", items: 4, total: "₦4,800", status: "Processing", tracking: "Being prepared" },
    { id: "#ORD004", date: "Feb 28, 2024", items: 1, total: "₦2,100", status: "Delivered", tracking: "Arrived on time" },
    { id: "#ORD005", date: "Feb 20, 2024", items: 5, total: "₦6,700", status: "Cancelled", tracking: "Cancelled by user" },
    { id: "#ORD006", date: "Feb 15, 2024", items: 2, total: "₦3,900", status: "Delivered", tracking: "Arrived with delay" },
    { id: "#ORD007", date: "Feb 10, 2024", items: 3, total: "₦4,500", status: "In Transit", tracking: "In warehouse" },
    { id: "#ORD008", date: "Feb 5, 2024", items: 1, total: "₦2,500", status: "Delivered", tracking: "Arrived on time" },
  ];

  const filteredOrders = selectedStatus === "all" ? allOrders : allOrders.filter(o => o.status === selectedStatus);

  const stats = [
    { label: "Total Orders", value: allOrders.length, color: "blue", icon: FaBox },
    { label: "Delivered", value: allOrders.filter(o => o.status === "Delivered").length, color: "green", icon: FaCheckCircle },
    { label: "In Transit", value: allOrders.filter(o => o.status === "In Transit").length, color: "yellow", icon: FaTruck },
    { label: "Processing", value: allOrders.filter(o => o.status === "Processing").length, color: "purple", icon: FaClock },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      case "In Transit":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      case "Processing":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300";
      case "Cancelled":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle />;
      case "In Transit":
        return <FaTruck />;
      case "Processing":
        return <FaClock />;
      case "Cancelled":
        return <FaExclamationCircle />;
      default:
        return <FaBox />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4">
            <FaArrowLeft /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track all your orders</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const colors = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              yellow: "from-yellow-500 to-yellow-600",
              purple: "from-purple-500 to-purple-600",
            };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-linear-to-br ${colors[stat.color]} text-white rounded-2xl p-6 shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="text-4xl opacity-30" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedStatus === "all"
                ? "bg-green-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-lg"
            }`}
          >
            <FaFilter /> All Orders
          </button>
          {["Delivered", "In Transit", "Processing", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedStatus === status
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-lg"
              }`}
            >
              {status}
            </button>
          ))}
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
            >
              <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No orders found with this status</p>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                        <FaBox className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{order.id}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items & Total */}
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{order.items}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-2xl font-bold text-green-600">{order.total}</p>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{order.tracking}</p>
                    <button className="text-green-600 hover:text-green-700 font-semibold transition-all hover:underline">
                      Track Order →
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pb-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        order.status === "Delivered" ? "bg-green-600" :
                        order.status === "In Transit" ? "bg-blue-600" :
                        order.status === "Processing" ? "bg-yellow-600" : "bg-red-600"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: order.status === "Delivered" ? "100%" :
                               order.status === "In Transit" ? "66%" :
                               order.status === "Processing" ? "33%" : "0%"
                      }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-linear-to-r from-green-600 to-blue-600 text-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Order Summary</h3>
              <p className="opacity-90">You have {filteredOrders.length} order(s) matching your filters</p>
            </div>
            <FaChartLine className="text-5xl opacity-30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
