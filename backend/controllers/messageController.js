import User from "../models/User.js";
import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const { username } = req.params;
  const { text } = req.body;

  try {
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }
    if (text.length > 500) {
      return res.status(400).json({ error: "Message exceeds 500 character limit" });
    }

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

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    // Verify ownership
    if (message.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized to delete this message" });
    }

    await Message.findByIdAndDelete(id);
    res.json({ success: true, message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

