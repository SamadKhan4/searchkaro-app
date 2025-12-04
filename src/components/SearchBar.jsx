export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="border rounded-lg p-3 w-full"
      value={value}
      onChange={onChange}
      placeholder="Search here..."
    />
  );
}
