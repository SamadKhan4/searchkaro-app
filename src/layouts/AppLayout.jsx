import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile: closed by default

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      {/* Main content wrapper - responsive margin */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen 
            ? "md:ml-64" // Desktop: full sidebar
            : "md:ml-20" // Desktop: collapsed sidebar
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main content - responsive padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
