import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaGoogle, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { show, hide } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    show("Signing in...");
    try {
      // ensure loader shows for at least 5s
      const delay = (ms) => new Promise((r) => setTimeout(r, ms));
      const [res] = await Promise.all([login({ email: formData.email, password: formData.password }), delay(5000)]);
      if (res.ok) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || "Login failed");
      }
    } finally {
      setLoading(false);
      hide();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-green-100">Sign in to your Naija Kitchen account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 rounded animate-fade-in">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-green-600 dark:text-green-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-green-600 dark:text-green-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-gray-700 dark:text-gray-300">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-green-600 hover:text-green-700 font-semibold">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              {loading ? "Signing in..." : "Sign In"} {!loading && <FaArrowRight />}
            </button>

            {/* Divider */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <FaGoogle className="text-red-600" /> Google
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 text-center border-t dark:border-gray-600 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <p className="text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-600 hover:text-green-700 font-bold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
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
        }} className="text-white hover:text-green-200 transition mt-6 inline-block font-semibold bg-none border-none cursor-pointer">
          ← Back to Home
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
