import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }

  // Optional: listen for disconnection
  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB Disconnected");
  });
};

export default connectDB;
