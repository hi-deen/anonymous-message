import { useEffect, useState } from "react";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/messages/${user.username}`
        );
        setMessages(res.data);
      } catch (err) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user.username]);

  const handleDelete = async (msgId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      setDeletingId(msgId);
      await axios.delete(`/messages/${msgId}`);
      setMessages(messages.filter((m) => m._id !== msgId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete message");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white px-4 py-10">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Your Anonymous Messages</h2>
            <p className="text-gray-600 dark:text-gray-300">Welcome, {user.username}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Share link card */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm p-5 mb-10">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Share your unique link:
          </p>

          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
            <span className="text-emerald-600 break-all font-medium">
              {window.location.origin}/u/{user.username}
            </span>

            <button
              className="ml-4 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition"
              onClick={() => navigator.clipboard.writeText(
                `${window.location.origin}/u/${user.username}`
              )}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Messages Section */}
        <h3 className="text-2xl font-semibold mb-4">Messages ({messages.length})</h3>

        {error && (
          <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No messages yet. Share your link to receive some!
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition transform hover:scale-[1.01] flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-100">{msg.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(msg._id)}
                  disabled={deletingId === msg._id}
                  className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition disabled:opacity-50"
                >
                  {deletingId === msg._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
