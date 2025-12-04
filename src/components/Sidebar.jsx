/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  FileText,
  Lock,
  MapPin,
  Star,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X, // Added X icon for the close button
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Categories", path: "/categories", icon: Folder },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Legal Policy", path: "/legal-policy", icon: Lock },
  { name: "Location", path: "/location", icon: MapPin },
  { name: "Rating", path: "/rating", icon: Star },
];

// Reusable component for the door icon (since it's not a standard lucide icon)
// In a real app, you'd use an SVG or a library icon. Using a placeholder div for now.
const DoorIcon = () => (
    <div className="mx-auto w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
        {/* A simple arrow/door representation similar to the image */}
        <div className="relative">
            <div className="w-8 h-10 bg-white rounded-md"></div>
            <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 w-4 h-4 bg-cyan-500 clip-arrow"></div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 bg-cyan-500"></div>
            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-1 bg-white"></div>
        </div>
    </div>
);

// Helper component for the actual SVG/Image from the prompt
const CustomLogoutIcon = () => (
    <div className="mx-auto my-4 w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center">
        {/* Using a simplified LogOut icon for demonstration */}
        <LogOut className="w-10 h-10 text-cyan-500 transform rotate-180" />
    </div>
);


export default function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef(null);

  // Function to reset and close the modal
  const closeModal = () => {
    setShowDialog(false);
    setCountdown(3);
    if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }
  }

  // Effect to manage the countdown timer
  useEffect(() => {
    if (showDialog) {
        // Start countdown only when the dialog is open
        setCountdown(3); // Reset to initial count
        timerRef.current = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount <= 1) {
                    clearInterval(timerRef.current);
                    // Automatically log out when countdown hits 0 (or less)
                    confirmLogout();
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
    } else {
        // Clear timer if dialog is closed
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    // Cleanup function to clear interval on component unmount or state change
    return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
  }, [showDialog]);


  // ⛔ Actual logout process
  const confirmLogout = () => {
    // Clear the timer immediately on manual logout
    if (timerRef.current) {
        clearInterval(timerRef.current);
    }
    
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";

    localStorage.removeItem("token");

    navigate("/login");
  };

  const baseLinkStyle =
    "flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 font-medium";
  const defaultLinkStyle =
    "text-gray-400 hover:text-white hover:bg-teal-500/20";
  const activeLinkStyle =
    "bg-teal-500 text-white shadow-lg shadow-teal-500/40";

  const sidebarWidth = isOpen ? "w-64" : "w-20";
  const textVisible = isOpen ? "opacity-100" : "opacity-0";
  const textDisplay = isOpen ? "inline" : "hidden";
  const justify = isOpen ? "justify-start" : "justify-center";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-900 fixed top-0 left-0 z-40 h-screen ${sidebarWidth}
        transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {/* Mobile Close Button */}
        <button
          onClick={toggle}
          className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Logo */}
        <div className="flex items-center p-4 h-16 border-b border-gray-800">
          <div className="p-2 bg-teal-500 rounded-lg text-white font-bold text-xl">
            V
          </div>
          <span
            className={`ml-3 text-white text-xl font-semibold transition-all duration-300 ${textVisible} ${textDisplay}`}
          >
            Searchkro
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={item.name}
              className={({ isActive }) =>
                `${baseLinkStyle} ${
                  isActive ? activeLinkStyle : defaultLinkStyle
                } ${justify}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span
                className={`transition-all duration-300 ${textVisible} ${textDisplay}`}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            className={`w-full flex items-center ${justify} gap-3 py-3 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300`}
            onClick={() => setShowDialog(true)} // <-- open modal
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span
              className={`transition-all duration-300 ${textVisible} ${textDisplay}`}
            >
              Logout
            </span>
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggle}
          className="absolute top-4 -right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 border transition-all duration-300"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* 🔥 Updated Logout Confirmation Modal to match image */}
      {/* ---------------------------------------------------------------- */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl relative text-center transform transition-transform duration-300 scale-100">
            
            {/* Close Button (X) */}
            <button
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-700"
                onClick={closeModal}
            >
                <X size={20} />
            </button>

            {/* Logout Icon - Used a placeholder for the custom image */}
            <CustomLogoutIcon />
            {/*  */}
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              You are Logged Out?
            </h2>
            
            {/* Message with Countdown */}
            <p className="text-gray-600 mb-6 text-base">
              You are about to logout in **{countdown} secs**, Do you want to continue?
            </p>

            {/* Single Action Button (Full Width) */}
            {/* Uses the cyan color from the image */}
            <button
              className="w-full py-3 rounded-lg bg-cyan-500 text-white font-semibold text-lg hover:bg-cyan-600 transition duration-300"
              onClick={confirmLogout}
            >
              Log Out
            </button>

          </div>
        </div>
      )}
    </>
  );
}