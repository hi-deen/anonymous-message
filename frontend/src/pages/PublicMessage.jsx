import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PublicMessage() {
  const { username } = useParams();
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(`http://localhost:5000/api/messages/${username}`, { text });
    setText("");
    setSent(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Send an Anonymous Message to @{username}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="40"
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">Send Message</button>
      </form>
      {sent && <p style={{ color: "green" }}>✅ Message sent!</p>}
    </div>
  );
}
