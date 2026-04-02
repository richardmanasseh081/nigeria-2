import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions");
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

      const res = await fetch(`${API_BASE}/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        // Store user in localStorage for Profile.jsx
        const user = {
          name: data.user.fullName,
          email: data.user.email,
          phone: data.user.phone,
          profilePicture: null,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/profile"); // go directly to Profile page
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-600 to-green-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-green-100 text-green-600 rounded-full p-4 mb-2">
            <FaUser size={32} />
          </div>
          <h1 className="text-3xl font-extrabold mb-1 text-center">Create Account</h1>
          <p className="text-gray-500 text-center">Sign up to get started!</p>
        </div>
        {error && <div className="mb-2 text-red-600 font-semibold text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaUser /></span>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border pl-10 pr-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              className="w-full border pl-10 pr-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaPhone /></span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border pl-10 pr-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full border pl-10 pr-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"><FaLock /></span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full border pl-10 pr-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="accent-green-600" />
            <span>I agree to the <span className="underline hover:text-green-700">terms and conditions</span></span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-bold shadow"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-gray-600">Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="ml-2 inline-flex items-center gap-2 text-green-700 hover:underline font-semibold"
          >
            <FaSignInAlt /> Login
          </button>
        </div>
      </div>
    </div>
  );
}