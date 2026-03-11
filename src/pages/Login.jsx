import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch("http://localhost/nigeria2/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setError("Server returned invalid response");
        setLoading(false);
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
      }
    } catch {
      setError("Network error, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-600 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-bold"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}