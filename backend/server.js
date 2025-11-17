import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { validateInput } from "./middleware/authMiddleware.js";

import connectMongodb from "./db/connectMongodb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// Apply input validation to user routes
app.use("/api/users", validateInput);

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // serve index.html for any unmatched route without using a path pattern
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectMongodb();
// });

(async () => {
  try {
    await connectMongodb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB, exiting", err);
    process.exit(1);
  }
})();