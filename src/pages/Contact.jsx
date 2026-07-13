import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { useLoading } from "../context/LoadingContext";

export default function Contact() {
  const navigate = useNavigate();
  const { show, hide } = useLoading();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // ✅ FIXED: Changed URL to match your other APIs
      const res = await fetch("http://localhost/nigeria2/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Contact response:", data);

      if (data.status === "success") {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setErrorMessage(data.message || "Failed to send message");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Contact form error:", err);
    }
  };

  const contactMethods = [
    { icon: FaPhone, title: "Call Us", detail: "07078966512", desc: "Available 9 AM - 9 PM daily", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900" },
    { icon: FaEnvelope, title: "Email Us", detail: "support@naijakitchen.com", desc: "We reply within 24 hours", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900" },
    { icon: FaMapMarkerAlt, title: "Visit Us", detail: "Abuja, Nigeria", desc: "Our main kitchen location", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900" },
    { icon: FaClock, title: "Hours", detail: "Mon - Sun, 10 AM - 10 PM", desc: "Always ready to serve you", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white p-8">
        <button onClick={async () => {
          const delay = (ms) => new Promise((r) => setTimeout(r, ms));
          try { show("Going back..."); await delay(3000); navigate("/"); } finally { hide(); }
        }} className="inline-block mb-4 text-green-100 hover:text-white transition bg-none border-none cursor-pointer font-inherit">
          ← Back to Home
        </button>
        <h1 className="text-5xl font-extrabold mb-2 animate-fade-in">Get in Touch</h1>
        <p className="text-xl text-green-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          We'd love to hear from you. Reach out with any questions or feedback.
        </p>
      </div>

      {/* Contact Methods */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Contact Information</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {contactMethods.map((method, idx) => (
            <div key={idx} className={`${method.bg} p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up text-center`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <method.icon className={`${method.color} text-4xl mx-auto mb-4`} />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{method.title}</h3>
              <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{method.detail}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{method.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Send us a Message</h2>

          {submitted && (
            <div className="mb-8 p-6 bg-green-100 dark:bg-green-900 rounded-xl border-2 border-green-600 flex items-center gap-4 animate-fade-in">
              <FaCheckCircle className="text-green-600 text-3xl" />
              <div>
                <p className="text-lg font-bold text-green-800 dark:text-green-200">Message Sent!</p>
                <p className="text-green-700 dark:text-green-300">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-xl border border-red-600 animate-fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg space-y-6">
            {/* Name */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0s" }}>
              <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400" placeholder="Your name" />
            </div>

            {/* Email */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400" placeholder="your.email@example.com" />
            </div>

            {/* Subject */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400" placeholder="What is this about?" />
            </div>

            {/* Message */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-2">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="6" className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400 resize-none" placeholder="Tell us more about your inquiry..."></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-4 bg-linear-to-r from-green-600 to-green-700 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { q: "What are your delivery hours?", a: "We deliver from 10 AM to 10 PM daily. Orders are typically delivered within 30 minutes of placement." },
            { q: "Do you offer vegetarian options?", a: "Yes! We have a variety of vegetarian Nigerian dishes. Check our menu for all available options." },
            { q: "Can I customize my order?", a: "Absolutely! We can modify portions, ingredients, and spice levels. Just let us know in the special instructions." },
            { q: "What payment methods do you accept?", a: "We accept cash on delivery, Paystack, and all major credit/debit cards for online orders." },
          ].map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-3">{faq.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
}