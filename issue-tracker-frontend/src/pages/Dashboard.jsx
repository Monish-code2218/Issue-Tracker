import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import IssueCard from "../components/IssueCard";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ tag: "", status: "", search: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getIssues = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`/issues?${query}`);
      setIssues(res.data);
    } catch {
      toast.error("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  const refreshIssues = () => {
    getIssues();
  };

  useEffect(() => {
    getIssues();
  }, [filters]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome, {user?.email?.split("@")[0]}
        </h1>
        <p className="text-sm text-gray-500">Here are your project issues:</p>
      </div>

      <div className="bg-white rounded-md shadow p-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            className="border p-2 rounded text-sm"
          >
            <option value="">🏷️ All Tags</option>
            <option value="bug">🐞 Bug</option>
            <option value="feature">✨ Feature</option>
            <option value="task">📝 Task</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border p-2 rounded text-sm"
          >
            <option value="">📌 All Status</option>
            <option value="open">🟢 Open</option>
            <option value="closed">🔒 Closed</option>
          </select>
        </div>

        <input
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          type="text"
          placeholder="🔍 Search issue title..."
          className="border p-2 rounded w-full sm:w-64 text-sm"
        />
      </div>

      {loading ? (
        <Spinner />
      ) : issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              refreshIssues={refreshIssues}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">No issues found 🚫</p>
      )}

      <button
        onClick={() => navigate("/create")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm rounded-full shadow-lg z-50"
      >
        ➕ Create Issue
      </button>
    </Layout>
  );
}
