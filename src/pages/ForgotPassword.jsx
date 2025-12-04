import React, { useState } from "react";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Use axios with cookie support
  const api = axios.create({
    baseURL: "https://elitetask-production.up.railway.app",
    withCredentials: true, // 🔥 VERY IMPORTANT → Cookies get saved
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });

  // Helper for x-www-form-urlencoded
  const toUrlEncoded = (obj) => {
    const formData = new URLSearchParams();
    for (let key in obj) formData.append(key, obj[key]);
    return formData;
  };

  // ------------------------------------
  // STEP 1 → SEND OTP
  // ------------------------------------
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const payload = toUrlEncoded({ email: email.trim() });

      const response = await api.post("/auth/forgot-password", payload);

      setMessage(response.data.message || `OTP sent to ${email}.`);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // STEP 2 → VERIFY OTP
  // ------------------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const payload = toUrlEncoded({
        email: email.trim(),
        otp: otp.trim()
      });

      const response = await api.post("/auth/verify-otp", payload);

      setMessage(response.data.message || "OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // STEP 3 → RESET PASSWORD
  // ------------------------------------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const payload = toUrlEncoded({
        email: email.trim(),
        otp: otp.trim(),
        newPassword: newPassword.trim()
      });

      const response = await api.post("/auth/reset-password", payload);

      setMessage(response.data.message || "Password reset successfully!");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // BACK BUTTON
  // ------------------------------------
  const handleBack = () => {
    if (step === 1) navigate(-1);
    else {
      setStep(step - 1);
      setMessage(null);
      setError(null);
    }
  };

  // ------------------------------------
  // STEP UI COMPONENTS
  // ------------------------------------
  const renderStepOne = () => (
    <form onSubmit={handleSendOtp} className="space-y-6">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600"
        disabled={loading || !email}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );

  const renderStepTwo = () => (
    <form onSubmit={handleVerifyOtp} className="space-y-6">
      <p className="text-gray-500 text-sm">
        Enter the 6-digit OTP sent to <strong>{email}</strong>.
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
        }
        placeholder="Enter OTP"
        className="w-full border rounded-lg px-4 py-3 text-center text-xl tracking-widest"
        required
        maxLength={6}
        disabled={loading}
      />

      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600"
        disabled={loading || otp.length !== 6}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <button
        type="button"
        className="w-full text-sm text-cyan-600 mt-2"
        onClick={() => setStep(1)}
        disabled={loading}
      >
        Resend / Change Email
      </button>
    </form>
  );

  const renderStepThree = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <p className="text-gray-500 text-sm">
        Set a new password for <strong>{email}</strong>.
      </p>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
        required
        minLength={6}
        disabled={loading}
      />

      <button
        type="submit"
        className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600"
        disabled={loading || newPassword.length < 6}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </h1>

            {message && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2" /> {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {step === 1 && renderStepOne()}
            {step === 2 && renderStepTwo()}
            {step === 3 && renderStepThree()}
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <img
              src="src/assets/Frame3.png"
              alt="Illustration"
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleBack}
          className="mt-6 flex items-center text-gray-500 hover:text-cyan-600"
          disabled={loading}
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          {step === 1 ? "Back to Login" : "Back"}
        </button>
      </div>
    </div>
  );
}
