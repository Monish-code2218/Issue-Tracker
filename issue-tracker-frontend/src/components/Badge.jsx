export default function Badge({ value }) {
  const colors = {
    open: "bg-green-100 text-green-800",
    closed: "bg-gray-200 text-gray-800",
    bug: "bg-red-100 text-red-700",
    feature: "bg-yellow-100 text-yellow-800",
    task: "bg-blue-100 text-blue-800",
  };
  const cls = colors[value] || "bg-gray-100 text-gray-700";

  const label = typeof value === "string" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${cls}`}>{label}</span>;
}
