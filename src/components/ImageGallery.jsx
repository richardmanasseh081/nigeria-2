import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function ImageGallery({ images = [], productName = "Product" }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Default image if none provided
  const galleryImages = images.length > 0 ? images : [
    "https://kikifoodies.com/wp-content/uploads/2025/03/ET5B8958-4.jpeg",
    "https://cjeatsrecipes.com/wp-content/uploads/2023/07/Easy-Fried-Chicken-on-a-plate.jpg"
  ];

  const nextImage = () => {
    setSelectedIdx((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        className="relative w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden group cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIdx}
            src={galleryImages[selectedIdx]}
            alt={`${productName} ${selectedIdx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Zoom Indicator */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
        >
          <ZoomIn className="w-5 h-5" />
        </motion.button>

        {/* Navigation Arrows */}
        {galleryImages.length > 1 && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              whileHover={{ scale: 1.1 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              whileHover={{ scale: 1.1 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        {galleryImages.length > 1 && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
            {selectedIdx + 1} / {galleryImages.length}
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3">
          {galleryImages.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                selectedIdx === idx
                  ? "border-green-600"
                  : "border-gray-300 dark:border-gray-600 hover:border-green-400"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-11/12 h-5/6"
            >
              <img
                src={galleryImages[selectedIdx]}
                alt={productName}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 text-white text-4xl hover:text-red-500 transition"
              >
                ✕
              </button>

              {galleryImages.length > 1 && (
                <>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
