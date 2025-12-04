/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [activeUser] = useState({
    name: "John Doe",
    role: "Admin",
  });

  // Mock data
  const categories = [
    { sno: 1, role: "Buyer", category: "Clothes", product: "Jeans" },
    { sno: 2, role: "Buyer", category: "Mobile", product: "iPhone" },
    { sno: 3, role: "Seller", category: "Laptop", product: "Dell" },
  ];

  const locations = [
    { sno: 1, role: "Buyer", location: "London", region: "Europe" },
    { sno: 2, role: "Buyer", location: "Mumbai", region: "Asia" },
    { sno: 3, role: "Seller", location: "Berlin", region: "Europe" },
  ];

  const legalPolicies = [
    "How do I book a service?",
    "How do I track my service provider?",
    "How do I rate and review a service?",
  ];

  const reportText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

  const ratingData = { positive: 50, negative: 50 };

  return (
    <div>
      {/* Dashboard content - Navbar and Sidebar are in AppLayout */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">Dashboard</h1>

      {/* GRID ROW 1 - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            <button 
              onClick={() => navigate('/categories')}
              className="px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              View
            </button>
          </div>

          <div className="overflow-x-auto" onClick={() => navigate('/categories')}>
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    S.no.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Categories
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.sno} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.sno}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.role}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.product}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Location Table */}
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Location</h2>
            <button 
              onClick={() => navigate('/location')}
              className="px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              View
            </button>
          </div>

          <div className="overflow-x-auto" onClick={() => navigate('/location')}>
            <table className="w-full min-w-[500px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    S.no.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    Region
                  </th>
                </tr>
              </thead>
              <tbody>
                {locations.map((item) => (
                  <tr key={item.sno} className="border-t border-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.sno}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.role}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.location}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.region}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GRID ROW 2 - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Legal Policy */}
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Legal policy
            </h2>
            <button 
              onClick={() => navigate('/legal-policy')}
              className="px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              View
            </button>
          </div>

          <div className="p-4" onClick={() => navigate('/legal-policy')}>
            <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
              <p className="text-sm">{legalPolicies[0]}</p>
              <p className="text-xs text-gray-400 mt-2">
                You can start a service by selecting your preferred category...
              </p>
            </div>

            {legalPolicies.slice(1).map((policy, index) => (
              <div
                key={index}
                className="py-3 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-sm text-gray-700">{policy}</span>
                <span className="text-gray-400">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Report */}
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Report</h2>
            <button 
              onClick={() => navigate('/reports')}
              className="px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              View
            </button>
          </div>

          <div className="p-4" onClick={() => navigate('/reports')}>
            <h3 className="font-semibold text-gray-800 mb-3">
              Company Overview
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {reportText}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Rating</h2>
            <button 
              onClick={() => navigate('/rating')}
              className="px-4 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
            >
              View
            </button>
          </div>

          <div className="p-4" onClick={() => navigate('/rating')}>
            {/* Donut chart */}
            <div className="flex items-center justify-center mb-6">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="25"
                  strokeDasharray={`${
                    (ratingData.negative / 100) * 377
                  } 377`}
                  transform="rotate(-90 80 80)"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="25"
                  strokeDasharray={`${
                    (ratingData.positive / 100) * 377
                  } 377`}
                  strokeDashoffset={`-${
                    (ratingData.negative / 100) * 377
                  }`}
                  transform="rotate(-90 80 80)"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Positive</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {ratingData.positive}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Negative</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {ratingData.negative}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
