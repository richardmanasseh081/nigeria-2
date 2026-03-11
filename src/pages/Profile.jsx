import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSignOutAlt, FaCamera, FaArrowRight } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

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
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        {/* Header */}
<div className="bg-green-600 text-white rounded-2xl p-6 mb-6 shadow-lg flex justify-between items-center">
  <div className="flex items-center gap-4">
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
    <div>
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>{user.email}</p>
    </div>
  </div>

  {/* Action buttons */}
  <div className="flex gap-3">
    <button
      onClick={() => navigate("/")}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
    >
      Home
    </button>
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
    >
      <FaSignOutAlt /> Logout
    </button>
  </div>
</div>

        {/* Profile Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
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
      </div>
    </div>
  );
}