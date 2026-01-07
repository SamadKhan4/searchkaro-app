/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await login(form);
    
    if (res.success) {
      console.log(res)
      navigate("/dashboard");
    } else {
      setError(res.error);
    }

    setLoading(false);
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    console.log("Initiating Google login");
    // Redirect to Google OAuth endpoint
    const baseUrl = import.meta.env.DEV ? "" : "http://localhost:3000";
    window.location.href = `${baseUrl}/googlelogin`;
  };

  // Smooth reveal for elements
  const fadeSlideUp = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.17, 0.55, 0.55, 1] },
    },
  };

  const fadeSlideRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 0.85, 0.45, 1] },
    },
  };

  const fadeSlideLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.15, 0.85, 0.45, 1] },
    },
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* LEFT IMAGE — Smooth slide left → right */}
      <motion.div
        variants={fadeSlideLeft}
        initial="hidden"
        animate="visible"
        className="hidden md:flex items-center justify-center bg-gray-50"
      >
        <img src="src/assets/Frame.png" className="w-4/5" />
      </motion.div>

      {/* RIGHT FORM — Smooth fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.9, ease: "easeOut" },
        }}
        className="flex flex-col justify-center px-10 md:px-20"
      >
        {/* Heading */}
        <motion.h1
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-semibold mb-6"
        >
          Welcome back
        </motion.h1>

        <form className="space-y-5" onSubmit={handleSubmit}>

          {error && <p className="text-red-500">{error}</p>}

          {/* Email field — Slide from Right */}
          <motion.input
            variants={fadeSlideRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* Password field — Slide from Right */}
          <motion.input
            variants={fadeSlideRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {/* Forgot password */}
          <motion.div
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Button — Smooth bottom → up */}
          <motion.button
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </motion.button>

          {/* Divider */}
          <motion.div 
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex items-center my-4"
          >
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </motion.div>

          {/* Google Login Button */}
          <motion.button
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </motion.button>

          {/* Signup text */}
          <motion.p
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="text-sm text-gray-500"
          >
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-600">
              Sign up
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
}