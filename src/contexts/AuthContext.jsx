/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginApi } from "../api";

const AuthContext = createContext();

// 🔥 COOKIE HELPERS
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from cookie only
  useEffect(() => {
    const storedToken = getCookie("token");

    if (storedToken) {
      setToken(storedToken);
      setUser({ loggedIn: true });
    } else {
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // -------------------------
  // LOGIN FUNCTION
  // -------------------------
  const login = async (credentials) => {
    try {
      const res = await loginApi(credentials);

      // Extract token (your backend sends "token")
      const t = res.data.token;
      const u = res.data.user || { loggedIn: true };

      if (!t) {
        throw new Error("No token received from server");
      }

      // 🔥 Store ONLY in cookie
      setCookie("token", t, 7); // 7 days expiry

      setToken(t);
      setUser(u);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message || "Login failed",
      };
    }
  };

  // -------------------------
  // LOGOUT FUNCTION
  // -------------------------
  const logout = () => {
    // Clear cookie only
    deleteCookie("token");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;