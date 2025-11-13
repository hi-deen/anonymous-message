import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:5000/api/messages/${user.username}`);
      console.log("Fetched messages:", res.data); 
      setMessages(res.data);
    };
    fetchMessages();
  }, [user.username]);

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Your Anonymous Messages</h2>
      <p>Share your link: <b>http://localhost:5173/u/{user.username}</b></p>
      {messages.map((msg) => (
        <div key={msg._id} style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}
