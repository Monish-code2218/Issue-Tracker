import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

export default function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("bug");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users for the assign dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/auth/users"); // ✅ uses backend /api/auth/users
        setUsers(res.data);
      } catch {
        toast.error("Could not load users");
      }
    };
    fetchUsers();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return toast.error("Title and description are required");
    }

    try {
      await axios.post("/issues", {
        title,
        description,
        tag,
        assignedTo: assignedTo || null, // allow unassigned
      });

      toast.success("✅ Issue created successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create issue");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📝 Create New Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Short descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tag
            </label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="bug">🐞 Bug</option>
              <option value="feature">✨ Feature</option>
              <option value="task">📝 Task</option>
            </select>
          </div>

          {/* Assign To */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.email}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              🚀 Submit Issue
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
