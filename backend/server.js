import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectMongodb from "./db/connectMongodb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongodb();
}) 


console.log("Server setup complete");