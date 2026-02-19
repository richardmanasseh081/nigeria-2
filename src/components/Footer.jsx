import { useState } from "react";
import { Mail } from "lucide-react";
import { useToast } from "../context/ToastContext";

function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Please enter a valid email", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate newsletter signup
      await new Promise((r) => setTimeout(r, 1000));
      localStorage.setItem("newsletter_email", email);
      addToast("Thank you for subscribing!", "success");
      setEmail("");
    } catch (error) {
      addToast("Failed to subscribe. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-green-100 mb-4 text-sm">
              Get the latest deals and updates delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition disabled:opacity-50 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {isLoading ? "..." : "Join"}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li>📞 07078966512</li>
              <li>📧 info@naija-kitchen.com</li>
              <li>📍 Lagos, Nigeria</li>
              <li>⏰ Mon - Sun: 9AM - 10PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 pt-6 text-center text-green-100 text-sm">
          <p>© 2025 Naija Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
