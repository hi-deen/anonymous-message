import { useState } from "react";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gray-50 dark:bg-gray-900 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 
                   rounded-2xl p-8 shadow-lg shadow-gray-300/40 dark:shadow-black/40 
                   space-y-6 animate-fadeInUp"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center 
                       text-gray-800 dark:text-white">
          Create an Account
        </h2>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg 
                       bg-gray-100 dark:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg 
                       bg-gray-100 dark:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg 
                       bg-gray-100 dark:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700
                     text-white font-semibold transition-all shadow-md
                     hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Already have an account? */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
