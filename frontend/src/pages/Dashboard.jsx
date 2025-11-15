import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${user.username}`
      );
      setMessages(res.data);
    };

    fetchMessages();
  }, [user.username]);

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white px-4 py-10">
      <div className="max-w-3xl mx-auto animate-fadeIn">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-3">
          Your Anonymous Messages
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Share your link and receive messages anonymously.
        </p>

        {/* Share link card */}
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-sm p-5 mb-10">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Share your unique link:
          </p>

          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
            <span className="text-emerald-600 break-all font-medium">
              http://localhost:5173/u/{user.username}
            </span>

            <button
              className="ml-4 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition"
              onClick={() => navigator.clipboard.writeText(
                `http://localhost:5173/u/${user.username}`
              )}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Messages Section */}
        <h3 className="text-2xl font-semibold mb-4">Messages</h3>

        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No messages yet. Share your link to receive some!
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition transform hover:scale-[1.01]"
              >
                {msg.text}
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
