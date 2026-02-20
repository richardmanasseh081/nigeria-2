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
      const res = await fetch("/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // If backend not available, try local frontend-only users store
        const localUsersRaw = localStorage.getItem("__local_users__");
        const localUsers = localUsersRaw ? JSON.parse(localUsersRaw) : [];
        const found = localUsers.find((u) => u.email === email && u.password === password);
        if (found) {
          const demo = { email: found.email, name: found.name };
          setUser(demo);
          return { ok: true, user: demo, fallback: true };
        }
        // If MSW isn't running (404) and in dev mode, fall back to a local demo user
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
      // Try frontend-only local users store as a last resort
      const localUsersRaw = localStorage.getItem("__local_users__");
      const localUsers = localUsersRaw ? JSON.parse(localUsersRaw) : [];
      const found = localUsers.find((u) => u.email === email && u.password === password);
      if (found) {
        const demo = { email: found.email, name: found.name };
        setUser(demo);
        return { ok: true, user: demo, fallback: true };
      }

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
      const res = await fetch("/api/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // backend not available — implement frontend-only signup using localStorage
        const localUsersRaw = localStorage.getItem("__local_users__");
        const localUsers = localUsersRaw ? JSON.parse(localUsersRaw) : [];
        // prevent duplicate emails
        if (localUsers.find((u) => u.email === email)) {
          throw new Error("User already exists");
        }
        const newUser = { email, name: fullName || "New User", phone, password };
        localUsers.push(newUser);
        localStorage.setItem("__local_users__", JSON.stringify(localUsers));
        setUser({ email: newUser.email, name: newUser.name });
        return { ok: true, user: { email: newUser.email, name: newUser.name }, fallback: true };
      }

      const data = await res.json();
      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (err) {
      // try frontend signup fallback if possible
      try {
        const localUsersRaw = localStorage.getItem("__local_users__");
        const localUsers = localUsersRaw ? JSON.parse(localUsersRaw) : [];
        if (localUsers.find((u) => u.email === email)) {
          return { ok: false, message: "User already exists" };
        }
        const newUser = { email, name: fullName || "New User", phone, password };
        localUsers.push(newUser);
        localStorage.setItem("__local_users__", JSON.stringify(localUsers));
        setUser({ email: newUser.email, name: newUser.name });
        return { ok: true, user: { email: newUser.email, name: newUser.name }, fallback: true };
      } catch (e) {
        if (import.meta.env.DEV) {
          const demo = { email, name: fullName || "New User" };
          setUser(demo);
          return { ok: true, user: demo, fallback: true };
        }
        return { ok: false, message: err.message || "Signup failed" };
      }
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
