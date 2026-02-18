import React, { useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function LoadingOverlay() {
  const { loading, message } = useLoading();
  const [imgError, setImgError] = useState(false);
  if (!loading) return null;

  const imgPath = "/image/image%20icon.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        {!imgError ? (
          <img
            src={imgPath}
            alt="logo"
            onError={() => setImgError(true)}
            className="w-16 h-16 animate-spin rounded-full object-cover"
          />
        ) : (
          <svg className="w-12 h-12 text-green-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        <div className="text-sm text-gray-700 dark:text-gray-200">{message || "Loading..."}</div>
      </div>
    </div>
  );
}
