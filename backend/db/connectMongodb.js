import mongoose from "mongoose";

const connectMongodb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("Mongodb connection error:", error);
        process.exit(1);
    }
}

export default connectMongodb; 