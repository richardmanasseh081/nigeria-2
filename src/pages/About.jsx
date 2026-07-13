import { Link, useNavigate } from "react-router-dom";
import { FaLeaf, FaTruck, FaSmile, FaClock, FaUsers, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import FAQAccordion from "../components/FAQAccordion";

export default function About() {
  const navigate = useNavigate();
  const { show, hide } = useLoading();
  const features = [
    { icon: FaLeaf, title: "Fresh Ingredients", desc: "Sourced locally for authenticity and quality" },
    { icon: FaTruck, title: "Fast Delivery", desc: "Hot meals delivered to your door in minutes" },
    { icon: FaSmile, title: "Great Service", desc: "Customer satisfaction is our priority" },
    { icon: FaClock, title: "Always Open", desc: "Order anytime, we're here for you" },
  ];

  const team = [
    { name: "Richard Manasseh", role: "Founder of the Company, and web", desc: "Passionate about authentic Nigerian cuisine" },
    { name: "Jovan Azuka", role: "Operations Manager", desc: "Ensuring quality and timely delivery" },
    { name: "ThankGod Anigbo", role: "Customer Care Lead", desc: "Making sure you smile with every order" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white p-8">
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
        <h1 className="text-5xl font-extrabold mb-2 animate-fade-in">About Naija Kitchen</h1>
        <p className="text-xl text-green-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Bringing authentic Nigerian meals to your table with love and passion
        </p>
      </div>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
              At Naija Kitchen, we believe food is more than just sustenance—it's a connection to our heritage, our culture, and our loved ones. We're dedicated to delivering authentic Nigerian meals prepared with fresh ingredients, traditional recipes, and modern convenience.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Founded in 2024, we started with a simple dream: to make home-cooked Nigerian meals accessible to everyone, no matter how busy their day is.
            </p>
          </div>
          <div className="animate-slide-in-right">
            <div className="bg-green-100 dark:bg-green-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="text-6xl font-bold text-green-600 dark:text-green-300 mb-4">5K+</div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8">Happy Customers Served</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaStar className="text-yellow-500 text-2xl" />
                  <span className="text-gray-700 dark:text-gray-300">4.8/5 Star Rating</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-blue-500 text-2xl" />
                  <span className="text-gray-700 dark:text-gray-300">30 min avg delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  className="text-4xl text-green-600 dark:text-green-300 mb-4"
                >
                  <feature.icon />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-12 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -15, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              className="bg-linear-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-md transition-all duration-300 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold hover:bg-green-700 transition cursor-pointer"
              >
                {member.name.charAt(0)}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{member.name}</h3>
              <p className="text-green-600 dark:text-green-300 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-700 dark:text-gray-300">{member.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-linear-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.08, y: -10 }}
              className="bg-linear-to-br from-green-700 to-green-800 p-8 rounded-2xl hover:from-green-600 hover:to-green-700 transition duration-300 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-3">✨ Authenticity</h3>
              <p className="text-lg leading-relaxed">We honor traditional Nigerian recipes and cooking methods passed down through generations.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, y: -10 }}
              className="bg-linear-to-br from-green-700 to-green-800 p-8 rounded-2xl hover:from-green-600 hover:to-green-700 transition duration-300 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-3">🏆 Quality</h3>
              <p className="text-lg leading-relaxed">Every meal is prepared with the finest fresh ingredients and meticulous attention to detail.</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, y: -10 }}
              className="bg-linear-to-br from-green-700 to-green-800 p-8 rounded-2xl hover:from-green-600 hover:to-green-700 transition duration-300 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-3">🤝 Community</h3>
              <p className="text-lg leading-relaxed">We celebrate Nigerian culture and build connections through the universal language of food.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-6">Ready to Taste Authentic Nigeria?</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">Start your journey with us today and experience food that tastes like home.</p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg"
            >
              Order Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>

      {/* FAQ Section */}
      <FAQAccordion />
    </div>
  );
}
