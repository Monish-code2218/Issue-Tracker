import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600">404</h1>
          <p className="mt-4 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
          <Link to="/dashboard" className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded">Back to Dashboard</Link>
        </div>
      </div>
    </Layout>
  );
}
