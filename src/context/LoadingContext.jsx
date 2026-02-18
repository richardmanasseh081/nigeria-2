import React, { createContext, useContext, useState, useEffect } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const show = (msg = "Loading...") => {
    setMessage(msg);
    setLoading(true);
  };

  const hide = () => {
    setLoading(false);
    setMessage("");
  };

  useEffect(() => {
    const onShow = (e) => show(e?.detail || "Loading...");
    const onHide = () => hide();
    window.addEventListener("show-loader", onShow);
    window.addEventListener("hide-loader", onHide);
    return () => {
      window.removeEventListener("show-loader", onShow);
      window.removeEventListener("hide-loader", onHide);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, message, show, hide }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

export default LoadingContext;
