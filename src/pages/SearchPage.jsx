export default function SearchResults({ data }) {
  return (
    <div className="mt-4 space-y-3">
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No results found.</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            {item}
          </div>
        ))
      )}
    </div>
  );
}
