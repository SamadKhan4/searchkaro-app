import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";
import ForgotPassword from "./pages/ForgotPassword";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import LegalPolicy from "./pages/LegalPolicy";
import Location from "./pages/Location";
import Rating from "./pages/Rating";


// PrivateRoute wrapper
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  // Show nothing while checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
    </div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Private routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <AppLayout>
                  <SearchPage />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Categories />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Reports />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/legal-policy"
            element={
              <PrivateRoute>
                <AppLayout>
                  <LegalPolicy />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/location"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Location />
                </AppLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/rating"
            element={
              <PrivateRoute>
                <AppLayout>
                  <Rating />
                </AppLayout>
              </PrivateRoute>
            }
          />
          

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}