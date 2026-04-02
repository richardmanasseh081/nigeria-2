import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {

      // Dynamic API base URL
      const API_BASE =
        process.env.REACT_APP_API_URL ||
        (window.location.hostname === "localhost"
          ? "http://localhost/nigeria2/api"
          : "https://your-vercel-domain.vercel.app/api");

      const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });


      let data;
      try {
        data = await res.json();
      } catch (err) {
        setError("Server returned invalid response");
        setLoading(false);
        // Log error for debugging
        console.error("Login response parse error", err);
        return;
      }

      if (data.status === "success" && data.user) {
        // Store user in localStorage for Profile.jsx
        const user = {
          name: data.user.fullName,
          email: data.user.email,
          phone: data.user.phone || "",
          profilePicture: null,
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/profile"); // Go directly to Profile page
      } else {
        setError(data.message || "Login failed");
        // Log error for debugging
        console.error("Login failed", data);
      }
    } catch (err) {
      setError("Network error, try again");
      // Log error for debugging
      console.error("Login network error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-700 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-green-100 text-green-600 rounded-full p-4 mb-2">
            <FaLock size={32} />
          </div>
          <h1 className="text-3xl font-extrabold mb-1 text-center">Sign In</h1>
          <p className="text-gray-500 text-center">Welcome back! Please login to your account.</p>
        </div>
        {error && <div className="text-red-600 font-semibold mb-2 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border pl-10 pr-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaLock /></span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full border pl-10 pr-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-bold shadow"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account?</span>
          <button
            onClick={() => navigate("/signup")}
            className="ml-2 inline-flex items-center gap-2 text-green-700 hover:underline font-semibold"
          >
            <FaUserPlus /> Register
          </button>
        </div>
      </div>
    </div>
  );
}