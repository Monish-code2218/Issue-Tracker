import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/api";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchIssueAndComments = async () => {
    try {
      setLoading(true);
      const [issueRes, commentRes] = await Promise.all([
        axios.get(`/issues/${id}`),
        axios.get(`/comments/${id}`)
      ]);
      setIssue(issueRes.data);
      setComments(commentRes.data);
    } catch {
      toast.error("Failed to load issue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssueAndComments();
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      setPosting(true);
      await axios.post(`/comments/${id}`, { content });
      setContent("");
      const res = await axios.get(`/comments/${id}`);
      setComments(res.data);
      toast.success("Comment posted");
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;
    try {
      await axios.delete(`/issues/${id}`);
      toast.success("Issue deleted");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to delete issue");
    }
  };

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : issue ? (
        <div className="max-w-3xl mx-auto mt-10">
          {/* Title + Delete Button */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-800">{issue.title}</h1>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
            >
              🗑 Delete
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4">{issue.description}</p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-8">
            <span>🏷️ <strong className="capitalize">{issue.tag}</strong></span>
            <span>📌 <strong className="capitalize">{issue.status}</strong></span>
            <span>👤 <strong>{issue.assignedTo?.email || "Unassigned"}</strong></span>
          </div>

          <hr className="mb-6" />

          {/* Comments */}
          <h2 className="text-xl font-semibold text-gray-800 mb-3">💬 Comments</h2>
          <form onSubmit={submitComment} className="mb-6">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring focus:ring-blue-100"
              placeholder="Write a comment..."
            />
            <button
              type="submit"
              disabled={posting}
              className={`mt-2 px-5 py-2 rounded-md transition text-white ${
                posting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {posting ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div
                  key={c._id}
                  className="bg-white shadow-sm border rounded-md p-4"
                >
                  <p className="text-sm text-gray-800">{c.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    By: {c.author?.email || "Unknown"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">Issue not found</p>
      )}
    </Layout>
  );
}
