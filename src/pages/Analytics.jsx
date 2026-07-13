import { Link } from "react-router-dom";
import { FaArrowLeft, FaChartBar, FaChartLine, FaChartPie, FaUsers, FaShoppingCart, FaArrowUp, FaClock, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Analytics() {
  const kpis = [
    { label: "Total Revenue", value: "₦245,800", change: "+12.5%", icon: FaDollarSign, color: "green" },
    { label: "Total Orders", value: "1,234", change: "+8.3%", icon: FaShoppingCart, color: "blue" },
    { label: "Active Customers", value: "856", change: "+15.2%", icon: FaUsers, color: "purple" },
    { label: "Avg Order Value", value: "₦1,985", change: "+5.1%", icon: FaArrowUp, color: "orange" },
  ];

  const salesData = [
    { month: "Jan", sales: 45000, orders: 245 },
    { month: "Feb", sales: 52000, orders: 278 },
    { month: "Mar", sales: 61000, orders: 312 },
    { month: "Apr", sales: 58000, orders: 289 },
    { month: "May", sales: 73000, orders: 358 },
    { month: "Jun", sales: 89000, orders: 412 },
  ];

  const topProducts = [
    { name: "Suya", sales: 342, revenue: "₦752,400" },
    { name: "Fried Chicken", sales: 298, revenue: "₦1,043,000" },
    { name: "Jollof Rice", sales: 267, revenue: "₦667,500" },
    { name: "Grilled Fish", sales: 189, revenue: "₦756,000" },
    { name: "Pepper Soup", sales: 156, revenue: "₦280,800" },
  ];

  const categoryData = [
    { name: "Proteins", percentage: 35, color: "bg-red-600" },
    { name: "Rice Dishes", percentage: 28, color: "bg-blue-600" },
    { name: "Soups", percentage: 22, color: "bg-green-600" },
    { name: "Snacks", percentage: 15, color: "bg-yellow-600" },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4">
            <FaArrowLeft /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your business performance and metrics</p>
        </motion.div>

        {/* KPIs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            const colors = {
              green: "from-green-500 to-green-600",
              blue: "from-blue-500 to-blue-600",
              purple: "from-purple-500 to-purple-600",
              orange: "from-orange-500 to-orange-600",
            };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-linear-to-br ${colors[kpi.color]} text-white rounded-2xl p-6 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="text-3xl opacity-70" />
                  <span className="text-green-200 text-sm font-bold">{kpi.change}</span>
                </div>
                <h3 className="text-sm opacity-80 mb-1">{kpi.label}</h3>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <FaChartLine /> Sales Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {salesData.map((data, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.sales / maxSales) * 100}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 bg-linear-to-t from-green-600 to-green-400 rounded-t-lg cursor-pointer group relative"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    ₦{(data.sales / 1000).toFixed(0)}k
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
              {salesData.map((data, i) => (
                <span key={i}>{data.month}</span>
              ))}
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <FaChartPie /> Categories
            </h3>
            <div className="space-y-4">
              {categoryData.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{cat.name}</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{cat.percentage}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden"
                  >
                    <motion.div
                      className={`h-full ${cat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <FaChartBar /> Top Performing Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl font-bold text-green-600">{i + 1}</div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{product.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} units sold</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-green-600">{product.revenue}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Time Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <FaClock /> Reporting Period
              </h3>
              <p className="opacity-90">January 2024 - June 2024</p>
            </div>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-bold transition-all hover:scale-105">
              Download Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
