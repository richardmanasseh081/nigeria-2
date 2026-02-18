import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaBullhorn, FaFire, FaGift, FaTrophy, FaCalendar, FaUsers, FaChartLine, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Marketing() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Summer Sale", type: "discount", discount: 30, status: "active", reach: 5420, clicks: 1203, conversions: 187, startDate: "Mar 1", endDate: "Mar 15" },
    { id: 2, name: "Buy 2 Get 1 Free", type: "promotion", offer: "Buy 2 Get 1 Free", status: "active", reach: 3890, clicks: 856, conversions: 134, startDate: "Mar 5", endDate: "Mar 20" },
    { id: 3, name: "Loyalty Program", type: "loyalty", offer: "10% off for members", status: "active", reach: 7230, clicks: 2145, conversions: 456, startDate: "Feb 15", endDate: "Jun 30" },
    { id: 4, name: "Flash Deal - Suya", type: "deal", offer: "30% off Suya", status: "upcoming", reach: 0, clicks: 0, conversions: 0, startDate: "Mar 20", endDate: "Mar 22" },
    { id: 5, name: "Referral Program", type: "referral", offer: "₦500 per referral", status: "inactive", reach: 4120, clicks: 932, conversions: 203, startDate: "Jan 1", endDate: "Feb 28" },
  ]);

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(c => 
      c.id === id 
        ? { ...c, status: c.status === "active" ? "inactive" : "active" }
        : c
    ));
  };

  const stats = [
    { label: "Total Reach", value: "20,760", icon: FaUsers, color: "blue" },
    { label: "Total Clicks", value: "5,136", icon: FaChartLine, color: "green" },
    { label: "Total Conversions", value: "980", icon: FaTrophy, color: "orange" },
    { label: "Conversion Rate", value: "19.1%", icon: FaFire, color: "red" },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "discount": return <FaFire className="text-red-600" />;
      case "promotion": return <FaGift className="text-yellow-600" />;
      case "loyalty": return <FaTrophy className="text-purple-600" />;
      case "deal": return <FaBullhorn className="text-orange-600" />;
      case "referral": return <FaUsers className="text-blue-600" />;
      default: return <FaBullhorn />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4">
            <FaArrowLeft /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Marketing Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage promotional campaigns</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const colors = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              orange: "from-orange-500 to-orange-600",
              red: "from-red-500 to-red-600",
            };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${colors[stat.color]} text-white rounded-2xl p-6 shadow-lg`}
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

        {/* Create Campaign Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2">
            <FaBullhorn /> Create New Campaign
          </button>
        </motion.div>

        {/* Active Campaigns */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Active & Upcoming Campaigns</h2>
          
          {campaigns.filter(c => c.status !== "inactive").map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className="p-6">
                {/* Campaign Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      {getTypeIcon(campaign.type)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{campaign.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <FaCalendar /> {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      campaign.status === "active" 
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                    }`}>
                      {campaign.status === "active" ? "● Active" : "● Upcoming"}
                    </span>
                    <button
                      onClick={() => toggleCampaignStatus(campaign.id)}
                      className="text-2xl cursor-pointer transition-all hover:scale-110"
                    >
                      {campaign.status === "active" ? (
                        <FaToggleOn className="text-green-600" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    {campaign.type === "discount" && `${campaign.discount}% Off`}
                    {campaign.type === "promotion" && campaign.offer}
                    {campaign.type === "loyalty" && campaign.offer}
                    {campaign.type === "deal" && campaign.offer}
                    {campaign.type === "referral" && campaign.offer}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg"
                  >
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{campaign.reach.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">People Reached</p>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center p-3 bg-green-50 dark:bg-green-900 rounded-lg"
                  >
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{campaign.clicks.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Clicks</p>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center p-3 bg-orange-50 dark:bg-orange-900 rounded-lg"
                  >
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{campaign.conversions}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Conversions</p>
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Performance</span>
                    <span className="text-sm font-bold text-green-600">
                      {((campaign.conversions / (campaign.reach || 1)) * 100).toFixed(1)}% CR
                    </span>
                  </div>
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(((campaign.conversions / (campaign.reach || 1)) * 100), 100)}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Past Campaigns */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Past Campaigns</h2>
          <div className="space-y-4">
            {campaigns.filter(c => c.status === "inactive").map((campaign, i) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center justify-between opacity-70"
              >
                <div className="flex items-center gap-4">
                  {getTypeIcon(campaign.type)}
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{campaign.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{campaign.startDate} - {campaign.endDate}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-400">{campaign.conversions} conversions</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">Ready to boost your sales?</h3>
          <p className="opacity-90 mb-4">Launch a new campaign and reach more customers today</p>
          <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-all hover:scale-105">
            Start Campaign
          </button>
        </motion.div>
      </div>
    </div>
  );
}
