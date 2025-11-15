import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PublicMessage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await axios.post(
      `http://localhost:5000/api/messages/${username}`,
      { text }
    );

    setText("");
    setSent(true);
  };

  return (
    <>
      {/* 🔥 Custom Animation for Shaking / Popping Button */}
      <style>
        {`
          @keyframes pop-shake {
            0% { transform: scale(1) translateX(0); }
            20% { transform: scale(1.05) translateX(-2px); }
            40% { transform: scale(1.05) translateX(2px); }
            60% { transform: scale(1.05) translateX(-2px); }
            80% { transform: scale(1.05) translateX(2px); }
            100% { transform: scale(1) translateX(0); }
          }

          .animate-pop {
            animation: pop-shake 1.2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="min-h-screen flex items-center justify-center
                      bg-gray-50 dark:bg-gray-900 px-4">

        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl
                        p-8 shadow-lg shadow-gray-300/40 dark:shadow-black/40
                        transform transition-all animate-fadeInUp space-y-6">

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Send an Anonymous Message to{" "}
            <span className="text-emerald-600">@{username}</span>
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Textarea */}
            <textarea
              rows="5"
              placeholder="Write your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700
                         border border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-gray-100
                         focus:outline-none focus:ring-2
                         focus:ring-emerald-500 transition resize-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700
                         text-white font-semibold shadow-md hover:shadow-lg
                         active:scale-[.98] transition-all"
            >
              Send Message
            </button>
          </form>

          {/* Sent Message */}
          {sent && (
            <p className="text-center text-emerald-600 font-medium animate-fadeIn">
              ✅ Message sent!
            </p>
          )}

          {/* New Bottom Button (Animated) */}
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700
                       text-white font-semibold shadow-md hover:shadow-lg
                       transition-all animate-pop"
          >
            Create your own anonymous link
          </button>

        </div>
      </div>
    </>
  );
}
