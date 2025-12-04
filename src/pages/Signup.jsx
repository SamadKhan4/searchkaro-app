/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await signup(form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Smooth reusable animations
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
      
      {/* LEFT FORM SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.9, ease: "easeOut" }
        }}
        className="flex flex-col justify-center px-10 md:px-20"
      >
        {/* Title */}
        <motion.h1
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-semibold mb-2"
        >
          Create account
        </motion.h1>

        <motion.p
          variants={fadeSlideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="text-gray-500 mb-6"
        >
          Let's get started with your 30 days trial
        </motion.p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}

          {/* Email field */}
          <motion.input
            variants={fadeSlideRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {/* Password field */}
          <motion.input
            variants={fadeSlideRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {/* Button */}
          <motion.button
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </motion.button>

          {/* Login redirect */}
          <motion.p
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500"
          >
            Already have an account?{" "}
            <a href="/login" className="text-cyan-600 font-medium">
              Log in
            </a>
          </motion.p>
        </form>
      </motion.div>

      {/* RIGHT IMAGE — Smooth slide from left */}
      <motion.div
        variants={fadeSlideLeft}
        initial="hidden"
        animate="visible"
        className="hidden md:flex items-center justify-center bg-gray-50"
      >
        <img src="src/assets/Frame2.png" className="w-4/5" />
      </motion.div>
    </div>
  );
}
