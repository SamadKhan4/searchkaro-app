// SidebarToggle.jsx
import React from 'react';

// Assume this component is placed at the top inside your sidebar component
export default function SidebarToggle({ isOpen, toggleSidebar }) {
  return (
    // This div contains the button and positions it correctly. 
    // You must ensure your sidebar div has the 'relative' class.
    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
      <button
        onClick={toggleSidebar}
        className={`
          p-2 
          rounded-full 
          bg-white             /* White background */
          shadow-lg            /* Good shadow */
          border 
          border-gray-200 
          text-gray-700 
          hover:bg-gray-50 
          focus:outline-none 
          transition-transform 
          duration-300
          
          /* For changing the arrow direction: */
          ${isOpen ? 'rotate-0' : 'rotate-180'}
        `}
      >
        {/* Left-facing arrow icon (from Heroicons) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          {/* This path is for the '<' or '>' direction arrow */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}