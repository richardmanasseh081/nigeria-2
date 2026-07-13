import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEdit, FaSignOutAlt, FaCamera, FaHome, FaArrowLeft } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Profile - Stored user:", storedUser);

    if (!storedUser) {
      console.log("No user found, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      console.log("Profile - Parsed user:", parsedUser);
      setUser(parsedUser);
      setEditData(parsedUser);
    } catch (err) {
      console.error("Error parsing user data:", err);
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(editData));
    setUser(editData);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData((prev) => ({
        ...prev,
        profilePicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <div className="w-20"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Cover Image Area */}
          <div className="h-32 bg-linear-to-r from-green-600 to-emerald-600"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="relative">
                <img
                  src={editData.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-900 shadow-xl"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 p-3 rounded-full cursor-pointer shadow-lg transition-colors">
                    <FaCamera className="text-white text-sm" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-500 text-sm mt-1">{user.phone || "No phone number"}</p>
            </div>

            {/* Edit Form or Info Display */}
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="text"
                      value={editData.phone || ""}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData(user);
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600/80 hover:bg-blue-500/80 backdrop-blur text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <FaEdit /> Edit Profile
                  </button>

                  {/* ✅ FIXED: Changed from /home to / */}
                  <Link
                    to="/"
                    className="w-full bg-green-600/80 hover:bg-green-500/80 backdrop-blur text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <FaHome /> Go to Home
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600/80 hover:bg-red-500/80 backdrop-blur text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Member Since</span>
              <span className="text-white">Today</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Account Status</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}