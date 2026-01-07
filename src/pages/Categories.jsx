import React, { useState, useEffect } from "react";
import { Plus, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCategories, addCategory } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Categories() {
  const { isAuthenticated } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [showDialog, setShowDialog] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomProduct, setShowCustomProduct] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  
  const [formData, setFormData] = useState({
    role: "",
    category: "",
    product: "",
    popular: true
  });

  // Predefined options
  const predefinedCategories = [
    "Clothes",
    "Mobile",
    "Laptop",
    "Shoes",
    "Food",
    "Electronics",
    "Furniture",
    "Books"
  ];

  const predefinedProducts = [
    "Jeans",
    "iPhone",
    "Dell",
    "Nike Shoes",
    "Pizza",
    "Samsung TV",
    "Office Chair",
    "Novel"
  ];

  // Filtered options based on search
  const filteredCategories = predefinedCategories.filter(cat =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredProducts = predefinedProducts.filter(prod =>
    prod.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      console.log("Fetching categories with auth status:", isAuthenticated);
      
      // API call without pagination parameters
      const response = await getCategories();
      console.log("Categories API Response:", response);
      
      // Handle response (assuming it's an array of categories)
      if (Array.isArray(response.data)) {
        // Set categories directly from response
        setCategories(response.data);
      } else if (response.data.categories && Array.isArray(response.data.categories)) {
        // If response has a categories property that contains the array
        setCategories(response.data.categories);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        // If response has a data property that contains the array
        setCategories(response.data.data);
      }
      
      setError("");
    } catch (err) {
      console.error("Error fetching categories:", err);
      console.error("Error response:", err.response);
      
      // More detailed error messaging
      if (err.response?.status === 403) {
        setError("Access denied: You don't have permission to view categories. Please contact your administrator.");
      } else if (err.response?.status === 401) {
        setError("Authentication required: Please log in again.");
      } else {
        setError("Failed to load categories. Please try again later.");
      }
      
      // Fallback to mock data if API fails
      setCategories([
        { id: "1", srNo: 1, role: "Buyer", category: "Clothes", product: "Jeans", popular: true },
        { id: "2", srNo: 2, role: "Buyer", category: "Mobile", product: "iPhone", popular: false },
        { id: "3", srNo: 3, role: "Seller", category: "Laptop", product: "Dell", popular: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    // Only fetch categories if user is authenticated
    if (isAuthenticated) {
      fetchCategories();
    } else {
      setError("You must be logged in to view categories");
    }
  }, [isAuthenticated]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit - API integrated
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Ensure category and product are selected
    if (!formData.role) {
      setError("Please select a role");
      return;
    }
    if (!formData.category) {
      setError("Please select or enter a category");
      return;
    }
    if (!formData.product) {
      setError("Please select or enter a product");
      return;
    }
    
    setLoading(true);

    try {
      const response = await addCategory(formData);
      
      // Check if the operation was successful
      if (response?.status === 200 || response?.status === 201) {
        // Instead of refreshing the entire list, add the new category to the existing list
        // This avoids full page refresh and maintains UX stability as per memory constraint
        if (response.data?.category) {
          setCategories(prevCategories => [...prevCategories, response.data.category]);
        }
        
        // Reset form and close dialog
        setFormData({ role: "", category: "", product: "", popular: true });
        setCategorySearch("");
        setProductSearch("");
        setShowCustomCategory(false);
        setShowCustomProduct(false);
        setShowDialog(false);
        setError("");
      } else {
        throw new Error(response?.data?.message || "Failed to add category");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      if (err.response?.status === 403) {
        setError("Access denied: You don't have permission to add categories.");
      } else if (err.response?.status === 401) {
        setError("Authentication required: Please log in again.");
      } else {
        setError(err.response?.data?.message || "Failed to add category");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
        
        {/* Add Button with Plus Icon */}
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
          disabled={!isAuthenticated}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
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
                  Categories
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Popular
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => (
                <tr
                  key={item._id || item.id || index} // Use _id from MongoDB, fallback to id or index
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{item.srNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.product}</td>
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

      {/* Add Category Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setFormData({ role: "", category: "", product: "", popular: true });
                  setCategorySearch("");
                  setProductSearch("");
                  setShowCustomCategory(false);
                  setShowCustomProduct(false);
                  setError("");
                }}
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
                    disabled={!isAuthenticated}
                  >
                    <option value="">Select Role</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                  </select>
                </div>

                {/* Category Field - Searchable Dropdown with Custom Option */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomCategory(!showCustomCategory)}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                      disabled={!isAuthenticated}
                    >
                      <Plus className="w-3 h-3" />
                      {showCustomCategory ? "Select from list" : "Custom category"}
                    </button>
                  </div>

                  {showCustomCategory ? (
                    // Custom Category Input
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Enter custom category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                      disabled={!isAuthenticated}
                    />
                  ) : (
                    // Searchable Dropdown
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          onFocus={() => setCategorySearch(categorySearch)}
                          placeholder="Search categories..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          disabled={!isAuthenticated}
                        />
                      </div>
                      
                      {categorySearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, category: cat });
                                  setCategorySearch(cat);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors text-sm"
                                disabled={!isAuthenticated}
                              >
                                {cat}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No categories found
                            </div>
                          )}
                        </div>
                      )}
                      
                      {formData.category && !categorySearch && (
                        <div className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm inline-block">
                          Selected: {formData.category}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Field - Searchable Dropdown with Custom Option */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomProduct(!showCustomProduct)}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                      disabled={!isAuthenticated}
                    >
                      <Plus className="w-3 h-3" />
                      {showCustomProduct ? "Select from list" : "Custom product"}
                    </button>
                  </div>

                  {showCustomProduct ? (
                    // Custom Product Input
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      placeholder="Enter custom product"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                      disabled={!isAuthenticated}
                    />
                  ) : (
                    // Searchable Dropdown
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          onFocus={() => setProductSearch(productSearch)}
                          placeholder="Search products..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          disabled={!isAuthenticated}
                        />
                      </div>
                      
                      {productSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map((prod) => (
                              <button
                                key={prod}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, product: prod });
                                  setProductSearch(prod);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors text-sm"
                                disabled={!isAuthenticated}
                              >
                                {prod}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No products found
                            </div>
                          )}
                        </div>
                      )}
                      
                      {formData.product && !productSearch && (
                        <div className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm inline-block">
                          Selected: {formData.product}
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
                    disabled={!isAuthenticated}
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
                  onClick={() => {
                    setShowDialog(false);
                    setFormData({ role: "", category: "", product: "", popular: true });
                    setCategorySearch("");
                    setProductSearch("");
                    setShowCustomCategory(false);
                    setShowCustomProduct(false);
                    setError("");
                  }}
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !isAuthenticated}
                  className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding..." : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}