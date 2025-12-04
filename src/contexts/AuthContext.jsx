/* eslint-disable react-hooks/immutability */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginApi } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(null);

  // Restore session from cookie if present
  useEffect(() => {
    const cookieToken = getCookie("auth_token");

    if (cookieToken) {
      setToken(cookieToken);
      setUser({ loggedIn: true });
    } else if (token) {
      setUser({ loggedIn: true });
    } else {
      setUser(null);
    }
  }, [token]);

  // 👍 Helper: Read cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // -------------------------
  // LOGIN FUNCTION
  // -------------------------
  const login = async (credentials) => {
    try {
      const res = await loginApi(credentials);

      console.log("LOGIN RESPONSE:", res.data);

      const t =
        res.data.token ||
        res.data.accessToken ||
        res.data.authToken ||
        res.data.jwt ;

      const u = res.data.user || { loggedIn: true };

      // ✅ Save Token in Cookie
      document.cookie = `auth_token=${t}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax`;

      // (Optional) Also keep in local storage
      localStorage.setItem("auth_token", t);

      setToken(t);
      setUser(u);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  // -------------------------
  // LOGOUT FUNCTION
  // -------------------------
  const logout = () => {
    // ❌ Remove cookie
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

    // ❌ Remove localStorage
    localStorage.removeItem("auth_token");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
