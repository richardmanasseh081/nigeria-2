import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSignOutAlt, FaCamera, FaBoxOpen, FaCog } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState("profile"); // profile | orders | settings

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setEditData(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSaveProfile = () => {
    localStorage.setItem("user", JSON.stringify(editData));
    setUser(editData);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result;
      const updatedUser = { ...editData, profilePicture: imageData };
      setEditData(updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  };


  if (!user) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-5xl mx-auto px-4 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-fit">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-green-600"
                />
              ) : (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl font-bold text-green-600">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
              {isEditing && activeTab === "profile" && (
                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer">
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
            <div className="text-center">
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition ${activeTab === "profile" ? "bg-green-100 text-green-700" : "hover:bg-green-50"}`}
            onClick={() => { setActiveTab("profile"); setIsEditing(false); }}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition ${activeTab === "orders" ? "bg-green-100 text-green-700" : "hover:bg-green-50"}`}
            onClick={() => { setActiveTab("orders"); setIsEditing(false); }}
          >
            <FaBoxOpen /> Orders
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition ${activeTab === "settings" ? "bg-green-100 text-green-700" : "hover:bg-green-50"}`}
            onClick={() => { setActiveTab("settings"); setIsEditing(false); }}
          >
            <FaCog /> Settings
          </button>
          <div className="mt-8 flex flex-col gap-2">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold justify-center"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  <FaEdit /> {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={editData.name || ""}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                      type="email"
                      value={editData.email || ""}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Phone</label>
                    <input
                      type="text"
                      value={editData.phone || ""}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-green-600 text-white py-2 rounded font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
                </div>
              )}
            </div>
          )}
          {activeTab === "orders" && (
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">My Orders</h2>
              <div className="text-gray-500">No orders to display yet.</div>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <div className="text-gray-500">Settings page coming soon.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}