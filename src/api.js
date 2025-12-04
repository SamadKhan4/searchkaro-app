// Axios instance + API helpers
import axios from "axios";

// Use proxy in development, direct URL in production
const API_BASE = import.meta.env.DEV 
  ? "/api" // Uses Vite proxy to avoid CORS
  : "https://elitetask-production.up.railway.app";


// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // 🔥 important for cookies
  headers: { "Content-Type": "application/json" },
});

// ❌ REMOVE token interceptor (not needed for cookies)
// api.interceptors.request.use(...)

// ---- API ENDPOINTS ----

// Signup
export const signup = (payload) => api.post("/signup", payload);

// Login
export const login = (payload) => api.post("/login", payload);

// Search API
export const searchAPI = (q) => api.get("/search", { params: { q } });

// Dashboard data (protected)
export const dashboardData = () => api.get("/dashboard");

// Categories API
export const getCategories = (page = 1, limit = 10) => 
  api.get("/categories", { params: { page, limit } });
export const addCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) => api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Reports API
export const getReports = () => api.get("/reports");
export const addReport = (payload) => api.post("/reports", payload);
export const updateReport = (id, payload) => api.put(`/reports/${id}`, payload);
export const deleteReport = (id) => api.delete(`/reports/${id}`);

// Export default instance
export default api;
