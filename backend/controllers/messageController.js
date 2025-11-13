import User from "../models/User.js";
import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const { username } = req.params;
  const { text } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    await Message.create({ userId: user._id, text });
    res.json({ success: true, message: "Message sent anonymously!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const messages = await Message.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/messageController.js
// export const getUserMessages = async (req, res) => {
//   try {
//     const { username } = req.params;
//     const messages = await Message.find({ recipient: username });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

