import { useState } from "react";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
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
      const res = await axios.post(
        "/users/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50
                    dark:bg-gray-900 px-4">

      {/* Card Container */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl
                   shadow-lg shadow-gray-300/40 dark:shadow-black/40
                   p-8 space-y-6 transform transition-all
                   animate-fadeInUp"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h2>

        {/* Username */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Username
          </label>
          <input
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700
                       border border-gray-300 dark:border-gray-600
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       transition"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700
                       border border-gray-300 dark:border-gray-600
                       text-gray-800 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       transition"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700
                     text-white font-semibold shadow-md transition-all
                     hover:shadow-lg active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400
                       font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
