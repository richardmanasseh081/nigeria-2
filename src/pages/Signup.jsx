import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaGoogle, FaEye, FaEyeSlash, FaArrowRight, FaCheck } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

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

  const { signup } = useAuth();
  const { show, hide } = useLoading();

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
    show("Creating account...");
    try {
      const delay = (ms) => new Promise((r) => setTimeout(r, ms));
      const [res] = await Promise.all([signup({ fullName: formData.fullName, email: formData.email, phone: formData.phone, password: formData.password }), delay(5000)]);
      if (res.ok) {
        // After successful signup, go to the login page and prefill the form
        navigate("/login", { state: { email: formData.email, password: formData.password } });
      } else {
        setError(res.message || "Signup failed");
      }
    } finally {
      setLoading(false);
      hide();
    }
  };

  const passwordStrength = formData.password.length > 0 ? Math.min(100, formData.password.length * 10) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Join Us!</h1>
            <p className="text-green-100">Create your Naija Kitchen account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-600 text-red-700 dark:text-red-200 rounded animate-fade-in">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-green-600 dark:text-green-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400"
                  placeholder="Chioma Okafor"
                />
              </div>
            </div>

            {/* Email */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Email Address</label>
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

            {/* Phone */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-green-600 dark:text-green-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400"
                  placeholder="+234 70789 66512"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Password</label>
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
              {formData.password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength < 40 ? "bg-red-600" : passwordStrength < 70 ? "bg-yellow-600" : "bg-green-600"
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    {passwordStrength < 40 ? "Weak" : passwordStrength < 70 ? "Medium" : "Strong"} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-green-600 dark:text-green-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs mt-1 text-green-600 flex items-center gap-1">
                  <FaCheck /> Passwords match
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the <Link to="/terms" className="text-green-600 hover:text-green-700 font-semibold">Terms and Conditions</Link> and{" "}
                  <Link to="/privacy" className="text-green-600 hover:text-green-700 font-semibold">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              {loading ? "Creating account..." : "Create Account"} {!loading && <FaArrowRight />}
            </button>

            {/* Divider */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
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
              style={{ animationDelay: "0.9s" }}
            >
              <FaGoogle className="text-red-600" /> Google
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 text-center border-t dark:border-gray-600 animate-fade-in-up" style={{ animationDelay: "1s" }}>
            <p className="text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-bold">
                Sign in here
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
