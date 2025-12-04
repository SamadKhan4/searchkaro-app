import React from "react";
import Card from "./Card";

export default function SearchResults({ results, loading, error }) {
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!results || results.length === 0) return <div className="p-4 text-gray-500">No results found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map(item => (
        <Card key={item.id} title={item.title}>
          <p className="text-sm text-gray-600">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
