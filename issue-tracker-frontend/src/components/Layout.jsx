import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-2xl font-bold text-blue-600"
            >
              🛠️ Issue Tracker
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">
                  {user.email || "User"}
                </span>
                <button
                  onClick={() => navigate("/create")}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  + New
                </button>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="text-sm text-green-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}
