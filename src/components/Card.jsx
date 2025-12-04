export default function Card({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}
