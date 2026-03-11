import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
      const res = await fetch("http://localhost/nigeria2/api/signup.php", {
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="email" name="email" placeholder="Email" autoComplete="off" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="w-full border px-3 py-2 rounded pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
          </div>
          
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" className="w-full border px-3 py-2 rounded pr-10" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
            I agree to the terms and conditions
          </label>

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded font-bold">
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}