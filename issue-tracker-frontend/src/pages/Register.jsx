import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/api";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { email, password });
      toast.success("Account created");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not register");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">🚀 Create account For Issue Tracker Devlopers</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-green-100" placeholder="dev@example.com" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-green-100" placeholder="••••••" />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">Have account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
}
