// Axios instance + API helpers for real backend
import axios from "axios";

// Production-safe API setup: prefer `VITE_API_URL` when provided.
// In development `.env.development` will set `VITE_API_URL` to http://localhost:3000
// This avoids relying on a dev-only `server.proxy` and keeps local dev working.
const BASE_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "http://localhost:3000" : "https://searchkaro-backend.onrender.com");

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Ensure credentials are sent with every request
api.defaults.withCredentials = true;

// 🔥 Token interceptor — REQUIRED for protected routes
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

api.interceptors.request.use(
  (config) => {
    // Use consistent token name with AuthContext
    const token = getCookie("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Also add a response interceptor to handle 401/403 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth tokens on authorization errors (consistent with AuthContext)
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    }
    return Promise.reject(error);
  }
);

// API ---
// Signup - connects to /api/signup (proxied to http://localhost:3000 in development)
export const signup = (payload) => api.post("/api/signup", payload);

// Login
export const login = (payload) => {
  console.log("Making login request with payload:", payload);
  return api.post("/api/login", payload);
};

// Search
export const searchAPI = (q) => api.get("/api/search", { params: { q } });

// Dashboard
export const dashboardData = () => api.get("/api/dashboard");

// Categories
export const getCategories = () => api.get("/api/categories");

export const addCategory = (payload) => api.post("/api/categories", payload);
export const updateCategory = (id, payload) => api.put(`/api/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/api/categories/${id}`);

// Ratings
export const getRatings = () => api.get("/api/ratings");

export const addRating = (payload) => api.post("/api/ratings", payload);
export const updateRating = (id, payload) => api.put(`/api/ratings/${id}`, payload);
export const deleteRating = (id) => api.delete(`/api/ratings/${id}`);

// Locations
export const getLocations = () => api.get("/api/locations");

export const addLocation = (payload) => api.post("/api/locations", payload);
export const updateLocation = (id, payload) => api.put(`/api/locations/${id}`, payload);
export const deleteLocation = (id) => api.delete(`/api/locations/${id}`);

// Legal Policies
export const getLegalPolicies = () => api.get("/api/legal-policies");

export const addLegalPolicy = (payload) => api.post("/api/legal-policies", payload);
export const updateLegalPolicy = (id, payload) => api.put(`/api/legal-policies/${id}`, payload);
export const deleteLegalPolicy = (id) => api.delete(`/api/legal-policies/${id}`);

// Reports
export const getReports = () => api.get("/api/reports");
export const addReport = (payload) => api.post("/api/reports", payload);
export const updateReport = (id, payload) => api.put(`/api/reports/${id}`, payload);
export const deleteReport = (id) => api.delete(`/api/reports/${id}`);

export default api;