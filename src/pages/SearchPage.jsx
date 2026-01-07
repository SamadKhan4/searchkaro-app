import React, { useState } from "react";
import { searchAPI } from "../api";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await searchAPI(query);
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch search results");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        <button 
          type="submit" 
          className="mt-3 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      
      <SearchResults results={results} loading={loading} error={error} />
    </div>
  );
}