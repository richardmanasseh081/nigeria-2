import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaChevronDown, FaHome, FaBox, FaChartBar, FaBullhorn, FaClipboardList, FaInfoCircle, FaPhone, FaCog, FaUser, FaSignInAlt, FaHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import InfoModal from "./InfoModal";

function Header({ cart = [], setShowCart }) {
  const [showMenu, setShowMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) && titleRef.current && !titleRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showMenu]);

  const handleNavClick = (path) => {
    // show a short loader then navigate
    setShowMenu(false);
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      try {
        show("Opening...");
        await delay(3000);
        window.location.href = path;
      } finally {
        hide();
      }
    })();
  };

  const handleModalClick = (action) => {
    setShowMenu(false);
    
    const modals = {};

    if (modals[action]) {
      setModalTitle(modals[action].title);
      setModalContent(modals[action].content);
      setModalOpen(true);
    }
  };

  const navigate = useNavigate();
  const { show, hide } = useLoading();

  const navLink = (e, to) => {
    e.preventDefault();
    setShowMenu(false);
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      try {
        show("Loading...");
        await delay(3000);
        navigate(to);
      } finally {
        hide();
      }
    })();
  };

  return (
    <>
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md relative">
      {/* Title with dropdown */}
      <div className="relative">
        <button
          ref={titleRef}
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 text-xl font-bold text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 transition"
          aria-haspopup="true"
          aria-expanded={showMenu}
        >
          Naija Kitchen
          <FaChevronDown className={`text-sm transition transform ${showMenu ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div
            ref={menuRef}
            className="fixed left-0 top-16 bottom-0 w-screen md:w-2/3 lg:w-1/2 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex h-full">
              {/* Sidebar Navigation */}
              <nav className="w-40 bg-gray-50 dark:bg-gray-900 p-3 border-r dark:border-gray-700 overflow-y-auto">
                <div className="space-y-1">
                  {/* Main Navigation */}
                  <button
                    onClick={() => handleNavClick("/")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <FaHome className="text-green-600" /> <span>Home</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("/orders")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition"
                  >
                    <FaClipboardList className="text-blue-600" /> <span>Orders</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("/products")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition"
                  >
                    <FaBox className="text-purple-600" /> <span>Product</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("/analytics")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition"
                  >
                    <FaChartBar className="text-orange-600" /> <span>Analytics</span>
                  </button>

                  <button
                    onClick={() => handleNavClick("/marketing")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition"
                  >
                    <FaBullhorn className="text-red-600" /> <span>Marketing</span>
                  </button>

                  {/* Divider */}
                  <div className="my-2 border-t dark:border-gray-700"></div>

                  {/* Utilities */}
                  <Link
                    to="/wishlist"
                    onClick={(e) => navLink(e, "/wishlist")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition text-sm"
                  >
                    <FaHeart className="text-red-600" /> <span>Wishlist</span>
                  </Link>

                  <Link
                    to="/reviews"
                    onClick={(e) => navLink(e, "/reviews")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition text-sm"
                  >
                    <FaStar className="text-yellow-600" /> <span>Reviews</span>
                  </Link>

                  <Link
                    to="/about"
                    onClick={(e) => navLink(e, "/about")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition text-sm"
                  >
                    <FaInfoCircle className="text-cyan-600" /> <span>About</span>
                  </Link>

                  <Link
                    to="/contact"
                    onClick={(e) => navLink(e, "/contact")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition text-sm"
                  >
                    <FaPhone className="text-teal-600" /> <span>Contact</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={(e) => navLink(e, "/settings")}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded hover:bg-green-200 dark:hover:bg-green-700 transition text-sm"
                  >
                    <FaCog className="text-gray-600" /> <span>Settings</span>
                  </Link>
                </div>
              </nav>

              {/* Content Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <h3 className="font-bold text-lg mb-3">Quick Links</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Navigate to manage your store, view analytics, or access account settings.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700 dark:text-gray-200">• <strong>Home:</strong> Return to the main page</p>
                  <p className="text-gray-700 dark:text-gray-200">• <strong>Orders:</strong> Manage your orders</p>
                  <p className="text-gray-700 dark:text-gray-200">• <strong>Product:</strong> View all products</p>
                  <p className="text-gray-700 dark:text-gray-200">• <strong>Analytics:</strong> View sales & stats</p>
                  <p className="text-gray-700 dark:text-gray-200">• <strong>Marketing:</strong> Campaigns & promotions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* About Us Link */}
        <Link 
          to="/about"
          onClick={(e) => navLink(e, "/about")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition"
        >
          About Us
        </Link>

        {/* Contact Us Link */}
        <Link 
          to="/contact"
          onClick={(e) => navLink(e, "/contact")}
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition"
        >
          Contact Us
        </Link>

        {/* User Profile or Login */}
        {user ? (
          <Link 
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all hover:scale-105 font-semibold"
          >
            <FaUser /> {user.name?.split(" ")[0] || "Profile"}
          </Link>
        ) : (
          <>
            <Link 
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 font-semibold"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link 
              to="/signup"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all hover:scale-105 font-semibold"
            >
              <FaUser /> Sign up
            </Link>
          </>
        )}
      </div>
    </header>

    <InfoModal
      isOpen={modalOpen}
      title={modalTitle}
      content={modalContent}
      onClose={() => setModalOpen(false)}
    />
    </>
  );
}

export default Header;


