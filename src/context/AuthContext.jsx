import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // If MSW isn't running (404) or in dev mode, fall back to a local demo user
        if (import.meta.env.DEV) {
          const demo = { email, name: body?.name || "Demo User" };
          setUser(demo);
          return { ok: true, user: demo, fallback: true };
        }
        throw new Error(body.message || "Invalid credentials");
      }

      const data = await res.json();
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      // network or other error -> fallback in dev
      if (import.meta.env.DEV) {
        const demo = { email, name: "Demo User" };
        setUser(demo);
        return { ok: true, user: demo, fallback: true };
      }
      return { ok: false, message: err.message || "Login failed" };
    }
  };

  const signup = async ({ fullName, email, phone, password }) => {
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (import.meta.env.DEV) {
          const demo = { email, name: fullName || "New User" };
          setUser(demo);
          return { ok: true, user: demo, fallback: true };
        }
        throw new Error(body.message || "Signup failed");
      }

      const data = await res.json();
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      if (import.meta.env.DEV) {
        const demo = { email, name: fullName || "New User" };
        setUser(demo);
        return { ok: true, user: demo, fallback: true };
      }
      return { ok: false, message: err.message || "Signup failed" };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
