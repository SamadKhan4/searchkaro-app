/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Plus, X, Search, Star } from "lucide-react";

export default function Rating() {
  const [ratings, setRatings] = useState([
    { id: 1, srNo: 1, categories: "Jeans", shop: "Clothes", rating: 4.5, review: true },
    { id: 2, srNo: 2, categories: "iPhone", shop: "Mobile", rating: 3.5, review: false },
    { id: 3, srNo: 3, categories: "Dell", shop: "Laptop", rating: 3.5, review: false },
    { id: 4, srNo: 4, categories: "Boots", shop: "Shoes", rating: 4.5, review: true },
    { id: 5, srNo: 5, categories: "Pizzaria Cafe", shop: "Food", rating: 4.5, review: false },
    { id: 6, srNo: 6, categories: "Wellness Oasis Clinic", shop: "Hospital", rating: 3.5, review: true },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomShop, setShowCustomShop] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [shopSearch, setShopSearch] = useState("");
  
  const [formData, setFormData] = useState({
    categories: "",
    shop: "",
    rating: 5,
    review: true
  });

  // Predefined options
  const predefinedCategories = [
    "Jeans",
    "iPhone",
    "Dell",
    "Boots",
    "Pizzaria Cafe",
    "Wellness Oasis Clinic",
    "Samsung TV",
    "Nike Shoes"
  ];

  const predefinedShops = [
    "Clothes",
    "Mobile",
    "Laptop",
    "Shoes",
    "Food",
    "Hospital",
    "Electronics",
    "Furniture"
  ];

  // Filtered options based on search
  const filteredCategories = predefinedCategories.filter(cat =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredShops = predefinedShops.filter(shop =>
    shop.toLowerCase().includes(shopSearch.toLowerCase())
  );

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="absolute w-5 h-5 text-yellow-400" />
            <div className="absolute overflow-hidden w-1/2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400" />
        );
      }
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.categories) {
      setError("Please select or enter a category");
      return;
    }
    if (!formData.shop) {
      setError("Please select or enter a shop");
      return;
    }
    
    setLoading(true);

    try {
      // TODO: API call will be added later
      // const response = await addRating(formData);
      
      // For now, adding locally
      const newRating = {
        id: ratings.length + 1,
        srNo: ratings.length + 1,
        ...formData,
        rating: parseFloat(formData.rating)
      };
      
      setRatings([...ratings, newRating]);
      
      // Reset form and close dialog
      resetForm();
    } catch (err) {
      console.error("Error adding rating:", err);
      setError(err.response?.data?.message || "Failed to add rating");
    } finally {
      setLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setFormData({ categories: "", shop: "", rating: 5, review: true });
    setCategorySearch("");
    setShopSearch("");
    setShowCustomCategory(false);
    setShowCustomShop(false);
    setShowDialog(false);
    setError("");
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Rating</h1>
        
        {/* Add Button with Plus Icon */}
        <button
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Rating</span>
        </button>
      </div>

      {/* Ratings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Rating</h2>
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
                  Categories
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Shop
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Review
                </th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{item.srNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.categories}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.shop}</td>
                  <td className="px-6 py-4">
                    {renderStars(item.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        item.review
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.review ? "Positive" : "Negative"}
                      {item.review ? " ↑" : " ↓"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Add Rating Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all max-h-[90vh] overflow-y-auto">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Rating</h2>
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
                {/* Categories Field - Searchable Dropdown with Custom Option */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Categories
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomCategory(!showCustomCategory)}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      {showCustomCategory ? "Select from list" : "Custom category"}
                    </button>
                  </div>

                  {showCustomCategory ? (
                    <input
                      type="text"
                      name="categories"
                      value={formData.categories}
                      onChange={handleInputChange}
                      placeholder="Enter custom category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          placeholder="Search categories..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
                                  setFormData({ ...formData, categories: cat });
                                  setCategorySearch(cat);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors text-sm"
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
                      
                      {formData.categories && !categorySearch && (
                        <div className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm inline-block">
                          Selected: {formData.categories}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Shop Field - Searchable Dropdown with Custom Option */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Shop
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCustomShop(!showCustomShop)}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      {showCustomShop ? "Select from list" : "Custom shop"}
                    </button>
                  </div>

                  {showCustomShop ? (
                    <input
                      type="text"
                      name="shop"
                      value={formData.shop}
                      onChange={handleInputChange}
                      placeholder="Enter custom shop"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={shopSearch}
                          onChange={(e) => setShopSearch(e.target.value)}
                          placeholder="Search shops..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      {shopSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredShops.length > 0 ? (
                            filteredShops.map((shop) => (
                              <button
                                key={shop}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, shop: shop });
                                  setShopSearch(shop);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors text-sm"
                              >
                                {shop}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No shops found
                            </div>
                          )}
                        </div>
                      )}
                      
                      {formData.shop && !shopSearch && (
                        <div className="mt-2 px-3 py-1 bg-teal-50 text-teal-700 rounded text-sm inline-block">
                          Selected: {formData.shop}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Rating Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="5">5 Stars</option>
                    <option value="4.5">4.5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3.5">3.5 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2.5">2.5 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1.5">1.5 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                {/* Review Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review
                  </label>
                  <select
                    name="review"
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value === 'true' })}
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
                  {loading ? "Adding..." : "Add Rating"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
