/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Plus, X, Search } from "lucide-react";
import { getLocations, addLocation } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Location() {
  const { isAuthenticated } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  const [showCustomRegion, setShowCustomRegion] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [regionSearch, setRegionSearch] = useState("");
  
  const [formData, setFormData] = useState({
    role: "",
    location: "",
    region: "",
    popular: true
  });

  // Predefined options
  const predefinedLocations = [
    "London",
    "Mumbai",
    "Berlin",
    "Toronto",
    "Paris",
    "Tokyo",
    "New York",
    "Sydney"
  ];

  const predefinedRegions = [
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Australia",
    "Middle East"
  ];

  // Filtered options based on search
  const filteredLocations = predefinedLocations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredRegions = predefinedRegions.filter(reg =>
    reg.toLowerCase().includes(regionSearch.toLowerCase())
  );

  // Fetch locations from API
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await getLocations();
      
      // Handle response
      if (Array.isArray(response.data)) {
        setLocations(response.data);
      } else if (response.data.locations && Array.isArray(response.data.locations)) {
        setLocations(response.data.locations);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setLocations(response.data.data);
      }
      
      setError("");
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError("Failed to load locations. Please try again later.");
      
      // Fallback to mock data if API fails
      setLocations([
        { id: 1, srNo: 1, role: "Buyer", location: "London", region: "Europe", popular: true },
        { id: 2, srNo: 2, role: "Buyer", location: "Mumbai", region: "Asia", popular: false },
        { id: 3, srNo: 3, role: "Seller", location: "Berlin", region: "Europe", popular: true },
        { id: 4, srNo: 4, role: "Buyer", location: "Toronto", region: "North America", popular: true },
        { id: 5, srNo: 5, role: "Buyer", location: "Paris", region: "Europe", popular: false },
        { id: 6, srNo: 6, role: "Seller", location: "Berlin", region: "Europe", popular: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.location) {
      setError("Please select or enter a location");
      return;
    }
    if (!formData.region) {
      setError("Please select or enter a region");
      return;
    }
    
    setLoading(true);

    try {
      const response = await addLocation(formData);
      
      // Check if the operation was successful
      if (response?.status === 200 || response?.status === 201) {
        // Instead of refreshing the entire list, add the new location to the existing list
        // This avoids full page refresh and maintains UX stability
        if (response.data?.location) {
          setLocations(prevLocations => [...prevLocations, response.data.location]);
        }
        
        // Reset form and close dialog
        resetForm();
      } else {
        throw new Error(response?.data?.message || "Failed to add location");
      }
    } catch (err) {
      console.error("Error adding location:", err);
      if (err.response?.status === 403) {
        setError("Access denied: You don't have permission to add locations.");
      } else if (err.response?.status === 401) {
        setError("Authentication required: Please log in again.");
      } else {
        setError(err.response?.data?.message || "Failed to add location");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setFormData({ role: "", location: "", region: "", popular: true });
    setLocationSearch("");
    setRegionSearch("");
    setShowCustomLocation(false);
    setShowCustomRegion(false);
    setShowDialog(false);
    setError("");
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Location</h1>
        
        {/* Add Button with Plus Icon */}
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Location</span>
        </button>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Location</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  S.no.
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Region
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Popular
                </th>
              </tr>
            </thead>
            <tbody>
              {locations.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{item.srNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.region}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        item.popular
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.popular ? "Positive" : "Negative"}
                      {item.popular ? " ↑" : " ↓"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Add Location Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Location</h2>
              <button
                onClick={resetForm}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Dialog Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Error Message in Dialog */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Role Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                {/* Location Field - Searchable Dropdown with Custom Option */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomLocation(!showCustomLocation)}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      {showCustomLocation ? "Select from list" : "Custom location"}
                    </button>
                  </div>

                  {showCustomLocation ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter custom location"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          placeholder="Search locations..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      {locationSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredLocations.length > 0 ? (
                            filteredLocations.map((loc) => (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, location: loc });
                                  setLocationSearch(loc);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors text-sm"
                              >
                                {loc}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No locations found
                            </div>
                          )}
                        </div>
                      )}
                      
                      {formData.location && !locationSearch && (
                        <div className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm inline-block">
                          Selected: {formData.location}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Region Field - Searchable Dropdown with Custom Option */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Region
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomRegion(!showCustomRegion)}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      {showCustomRegion ? "Select from list" : "Custom region"}
                    </button>
                  </div>

                  {showCustomRegion ? (
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      placeholder="Enter custom region"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={regionSearch}
                          onChange={(e) => setRegionSearch(e.target.value)}
                          placeholder="Search regions..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      {regionSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredRegions.length > 0 ? (
                            filteredRegions.map((reg) => (
                              <button
                                key={reg}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, region: reg });
                                  setRegionSearch(reg);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors text-sm"
                              >
                                {reg}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No regions found
                            </div>
                          )}
                        </div>
                      )}
                      
                      {formData.region && !regionSearch && (
                        <div className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm inline-block">
                          Selected: {formData.region}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Popular Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Popular
                  </label>
                  <select
                    name="popular"
                    value={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.value === 'true' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="true">Positive</option>
                    <option value="false">Negative</option>
                  </select>
                </div>
              </div>

              {/* Dialog Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding..." : "Add Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}