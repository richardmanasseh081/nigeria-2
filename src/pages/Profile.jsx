import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaStar, FaBox, FaEdit, FaSignOutAlt, FaCreditCard, FaArrowRight, FaCamera } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    setEditData(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSaveProfile = () => {
    localStorage.setItem("user", JSON.stringify(editData));
    setUser(editData);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result;
        const updatedUser = { ...editData, profilePicture: imageData };
        setEditData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-green-600">
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer transition-all">
                    <FaCamera className="text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name || "User"}</h1>
                <p className="text-green-100">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit sticky top-8">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Menu</h3>
            <nav className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: <FaUser /> },
                { id: "orders", label: "Orders", icon: <FaBox /> },
                { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
                { id: "reviews", label: "Reviews", icon: <FaStar /> },
                { id: "payment", label: "Payment Methods", icon: <FaCreditCard /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    activeTab === item.id
                      ? "bg-green-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                    >
                      <FaEdit /> {isEditing ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Full Name</label>
                        <input
                          type="text"
                          value={editData.name || ""}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Email</label>
                        <input
                          type="email"
                          value={editData.email || ""}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-600 outline-none"
                        />
                      </div>
                      <button
                        onClick={handleSaveProfile}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all hover:scale-105"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <FaUser className="text-green-600 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{user.name || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <FaEnvelope className="text-green-600 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Email Address</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <FaPhone className="text-green-600 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{user.phone || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Total Orders", value: "12", color: "blue" },
                    { label: "Wishlist Items", value: "5", color: "red" },
                    { label: "Reviews Given", value: "8", color: "yellow" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 text-white rounded-xl p-6 shadow-lg`}
                      style={{
                        background: stat.color === "blue" ? "linear-gradient(135deg, #3b82f6, #2563eb)" : 
                                   stat.color === "red" ? "linear-gradient(135deg, #ef4444, #dc2626)" :
                                   "linear-gradient(135deg, #eab308, #ca8a04)"
                      }}
                    >
                      <p className="text-sm opacity-90">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Orders</h2>
                <div className="space-y-4">
                  {[
                    { id: "#ORD001", date: "Mar 15, 2024", total: "₦5,500", status: "Delivered" },
                    { id: "#ORD002", date: "Mar 10, 2024", total: "₦3,200", status: "In Transit" },
                    { id: "#ORD003", date: "Mar 5, 2024", total: "₦4,800", status: "Processing" },
                  ].map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-green-600">
                      <div>
                        <p className="font-bold text-gray-800 dark:text-white">{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800 dark:text-white">{order.total}</p>
                        <p className={`text-sm font-semibold ${
                          order.status === "Delivered" ? "text-green-600" :
                          order.status === "In Transit" ? "text-blue-600" : "text-yellow-600"
                        }`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/order-tracking" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mt-6">
                  Track orders <FaArrowRight />
                </Link>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Wishlist</h2>
                <div className="text-center py-12">
                  <FaHeart className="text-6xl text-red-400 mx-auto mb-4 opacity-30" />
                  <p className="text-gray-600 dark:text-gray-400">No items in your wishlist yet</p>
                  <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mt-4">
                    Start exploring <FaArrowRight />
                  </Link>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Reviews</h2>
                <div className="text-center py-12">
                  <FaStar className="text-6xl text-yellow-400 mx-auto mb-4 opacity-30" />
                  <p className="text-gray-600 dark:text-gray-400">You haven't left any reviews yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Leave a review on products after placing an order</p>
                  <Link to="/reviews" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mt-4">
                    Go to Reviews <FaArrowRight />
                  </Link>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Payment Methods</h2>
                <div className="space-y-4">
                  {[
                    { type: "Mastercard", last4: "4242", expires: "12/25" },
                    { type: "Visa", last4: "5555", expires: "08/24" },
                  ].map((card, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FaCreditCard className="text-2xl text-gray-600 dark:text-gray-400" />
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white">{card.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">•••• {card.last4}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expires {card.expires}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all hover:scale-105">
                  Add Payment Method
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
