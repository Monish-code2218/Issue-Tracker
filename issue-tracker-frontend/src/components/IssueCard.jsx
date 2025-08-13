import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import toast from "react-hot-toast";
import { useState } from "react";

function IssueCard({ issue, refreshIssues }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Toggle status open/closed
  const toggleStatus = async (e) => {
    e.stopPropagation(); // prevent card click navigation
    try {
      setLoading(true);
      const newStatus = issue.status === "open" ? "closed" : "open";
      await axios.patch(`/issues/${issue._id}/status`, { status: newStatus });
      toast.success(`Issue marked as ${newStatus}`);
      refreshIssues(); // update list instantly
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // Delete issue
  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent navigation
    if (window.confirm("Delete this issue?")) {
      try {
        await axios.delete(`/issues/${issue._id}`);
        toast.success("Deleted");
        refreshIssues(); // update list instantly
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div
      onClick={() => navigate(`/issues/${issue._id}`)}
      className="bg-white p-4 rounded shadow-sm mb-4 border hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{issue.title}</h2>
        <Badge value={issue.status} />
      </div>

      <p className="text-sm text-gray-600 mt-1">{issue.description}</p>

      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
        <Badge value={issue.tag} />
        <span>👤 {issue.assignedTo?.email || "Unassigned"}</span>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={toggleStatus}
          disabled={loading}
          className={`px-3 py-1 rounded text-white text-sm ${
            issue.status === "open" ? "bg-red-500" : "bg-green-500"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading
            ? "Updating..."
            : issue.status === "open"
            ? "Close"
            : "Reopen"}
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 text-xs rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default IssueCard;
