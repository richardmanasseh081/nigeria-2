import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 100 }}
      className={`${colors[type]} text-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm`}
    >
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="hover:opacity-80 transition">
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
