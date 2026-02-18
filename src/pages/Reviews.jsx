import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    foodName: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews(savedReviews);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      ...formData,
      author: user.name,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    setFormData({ foodName: "", rating: 5, comment: "" });
    setShowForm(false);
    alert("Review posted successfully!");
  };

  const deleteReview = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  if (!user) return <div className="text-center py-20">Loading...</div>;

  const userReviews = reviews.filter(r => r.author === user.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4">
            <FaArrowLeft /> Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FaStar className="text-yellow-500" /> My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{userReviews.length} reviews posted</p>
        </div>

        {/* Post Review Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
        >
          {showForm ? "Cancel" : "+ Write a Review"}
        </button>

        {/* Review Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Food Name</label>
                <input
                  type="text"
                  value={formData.foodName}
                  onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 outline-none"
                  placeholder="e.g., Jollof Rice"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`text-3xl transition-all ${
                        star <= formData.rating ? "text-yellow-500 scale-110" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">Comment</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-green-600 outline-none"
                  placeholder="Share your experience with this food..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all hover:scale-105"
              >
                Post Review
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {userReviews.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
              <FaStar className="text-6xl text-yellow-400 mx-auto mb-4 opacity-20" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No reviews yet</h2>
              <p className="text-gray-600 dark:text-gray-400">Start reviewing your favorite foods!</p>
            </div>
          ) : (
            userReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{review.foodName}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={star <= review.rating ? "text-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 p-2 rounded-lg transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>

                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">By {review.author}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* All Reviews */}
        {reviews.length > userReviews.length && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Community Reviews</h2>
            <div className="space-y-4">
              {reviews.filter(r => r.author !== user.name).map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{review.foodName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`text-sm ${star <= review.rating ? "text-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{review.author}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
