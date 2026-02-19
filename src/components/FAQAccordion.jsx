import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What are your delivery options?",
    answer: "We offer delivery within Lagos and surrounding areas. Delivery typically takes 30-60 minutes depending on location.",
  },
  {
    question: "Do you offer vegetarian options?",
    answer: "Yes! We have a variety of vegetarian dishes available. Check our menu for options marked as vegetarian.",
  },
  {
    question: "Can I modify my order after placing it?",
    answer: "You can modify orders up to 5 minutes after placing them. Please contact us immediately through the chat or phone.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept card payments, bank transfers, and mobile money (MTN, Airtel). Cash on delivery is also available in selected areas.",
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order in real-time on the Order Tracking page. You'll receive updates via email and SMS.",
  },
  {
    question: "Is there a minimum order amount?",
    answer: "Yes, the minimum order is ₦2,500. Orders below this amount may incur an additional service charge.",
  },
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => setOpenId(openId === index ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <span className="font-semibold text-left text-gray-900 dark:text-white">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openId === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </button>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: openId === index ? "auto" : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600">
                {faq.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
