import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCog,
  FaUser,
  FaLock,
  FaBell,
  FaTruck,
  FaGlobe,
  FaCreditCard,
  FaEye,
  FaMoon,
  FaAdjust,
  FaToggleOn,
  FaToggleOff,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useLoading } from "../context/LoadingContext";

export default function Settings() {
  const navigate = useNavigate();
  const { show, hide } = useLoading();
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    defaultDeliveryType: "standard",
    defaultPayment: "card",
    language: "en",
    currency: "NGN",
    twoFactor: false,
    privateProfile: false,
    shareActivity: true,
    saveAddresses: true,
    showOnlineStatus: true,
    fontSize: "medium",
    highContrast: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const sections = [
    {
      id: "account",
      title: "Account Settings",
      icon: FaUser,
      items: [
        {
          label: "Full Name",
          type: "text",
          value: "Chioma Okafor",
          icon: "👤",
        },
        {
          label: "Email Address",
          type: "text",
          value: "chioma@example.com",
          icon: "✉️",
        },
        {
          label: "Phone Number",
          type: "text",
          value: "+234 70789 66512",
          icon: "📱",
        },
      ],
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: FaBell,
      toggles: [
        {
          label: "Email Notifications",
          key: "emailNotifications",
          desc: "Receive updates via email",
        },
        {
          label: "SMS Notifications",
          key: "smsNotifications",
          desc: "Get alerts via text message",
        },
        {
          label: "Push Notifications",
          key: "pushNotifications",
          desc: "Receive browser notifications",
        },
        {
          label: "Order Updates",
          key: "orderUpdates",
          desc: "Track order status in real-time",
        },
        {
          label: "Promotions & Offers",
          key: "promotions",
          desc: "Be first to know about deals",
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery Preferences",
      icon: FaTruck,
      selects: [
        {
          label: "Default Delivery Type",
          key: "defaultDeliveryType",
          options: [
            { value: "standard", label: "🚚 Standard (30 min)" },
            { value: "express", label: "⚡ Express (15 min)" },
            { value: "scheduled", label: "📅 Scheduled" },
          ],
        },
        {
          label: "Save Addresses",
          key: "saveAddresses",
          type: "toggle",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment Settings",
      icon: FaCreditCard,
      selects: [
        {
          label: "Default Payment Method",
          key: "defaultPayment",
          options: [
            { value: "card", label: "💳 Debit/Credit Card" },
            { value: "paystack", label: "🎯 Paystack" },
            { value: "cash", label: "💵 Cash on Delivery" },
          ],
        },
      ],
    },
    {
      id: "localization",
      title: "Language & Localization",
      icon: FaGlobe,
      selects: [
        {
          label: "Language",
          key: "language",
          options: [
            { value: "en", label: "🇬🇧 English" },
            { value: "yo", label: "🇳🇬 Yoruba" },
            { value: "ig", label: "🇳🇬 Igbo" },
            { value: "ha", label: "🇳🇬 Hausa" },
          ],
        },
        {
          label: "Currency",
          key: "currency",
          options: [
            { value: "NGN", label: "₦ Nigerian Naira" },
            { value: "USD", label: "$ US Dollar" },
            { value: "EUR", label: "€ Euro" },
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: FaLock,
      toggles: [
        {
          label: "Two-Factor Authentication",
          key: "twoFactor",
          desc: "Add extra security to your account",
        },
        {
          label: "Private Profile",
          key: "privateProfile",
          desc: "Others can't see your activity",
        },
        {
          label: "Show Online Status",
          key: "showOnlineStatus",
          desc: "Let others know you're active",
        },
      ],
    },
    {
      id: "display",
      title: "Display & Accessibility",
      icon: FaAdjust,
      toggles: [
        {
          label: "Dark Mode",
          key: "darkMode",
          desc: "Easier on the eyes",
        },
        {
          label: "High Contrast",
          key: "highContrast",
          desc: "Better for readability",
        },
      ],
      selects: [
        {
          label: "Font Size",
          key: "fontSize",
          options: [
            { value: "small", label: "A Small" },
            { value: "medium", label: "A Medium" },
            { value: "large", label: "A Large" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white p-8">
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
        }} className="inline-block mb-4 text-green-100 hover:text-white transition bg-none border-none cursor-pointer font-inherit">
          ← Back to Home
        </button>
        <h1 className="text-5xl font-extrabold mb-2 animate-fade-in flex items-center gap-3">
          <FaCog /> Settings
        </h1>
        <p className="text-xl text-green-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Customize your experience and manage your preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {sections.map((section, sectionIdx) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${sectionIdx * 0.1}s` }}
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-700 dark:to-green-800 p-6 flex items-center gap-4">
                <Icon className="text-3xl text-white" />
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>

              {/* Section Content */}
              <div className="p-8 space-y-6">
                {/* Text Inputs */}
                {section.items?.map((item, idx) => (
                  <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-3">
                      {item.icon} {item.label}
                    </label>
                    <input
                      type={item.type}
                      defaultValue={item.value}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 focus:outline-none transition hover:border-gray-400"
                    />
                  </div>
                ))}

                {/* Toggles */}
                {section.toggles?.map((toggle, idx) => (
                  <div
                    key={toggle.key}
                    className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{toggle.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{toggle.desc}</p>
                    </div>
                    <button
                      onClick={() => handleToggle(toggle.key)}
                      className="text-3xl transition-all duration-300 hover:scale-110"
                    >
                      {settings[toggle.key] ? (
                        <FaToggleOn className="text-green-600" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}

                {/* Select Dropdowns */}
                {section.selects?.map((select, idx) => (
                  <div key={select.key} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <label className="block text-lg font-semibold text-gray-700 dark:text-white mb-3">
                      {select.label}
                    </label>
                    {select.type === "toggle" ? (
                      <button
                        onClick={() => handleToggle(select.key)}
                        className="w-full text-left px-4 py-3 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg hover:border-green-600 focus:outline-none transition"
                      >
                        <div className="flex items-center justify-between">
                          <span>{select.label}</span>
                          {settings[select.key] ? (
                            <FaToggleOn className="text-green-600" />
                          ) : (
                            <FaToggleOff className="text-gray-400" />
                          )}
                        </div>
                      </button>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {select.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSelect(select.key, option.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 flex items-center justify-between ${
                              settings[select.key] === option.value
                                ? "border-green-600 bg-green-50 dark:bg-green-900"
                                : "border-gray-300 dark:border-gray-600 hover:border-green-400"
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                settings[select.key] === option.value
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {option.label}
                            </span>
                            {settings[select.key] === option.value && (
                              <FaCheckCircle className="text-green-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Save & Reset Buttons */}
        <div className="flex gap-4 justify-end mb-12 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <button className="px-8 py-4 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-bold hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-105 transition-all duration-300">
            Reset to Defaults
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-bold hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 shadow-lg">
            Save Changes
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
