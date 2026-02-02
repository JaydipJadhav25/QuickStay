// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import cookieParser from "cookie-parser"

// Routes
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingsRoutes.js";

// Connect Database & Cloudinary
connectDB();
connectCloudinary();

// Initialize Express App
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended  :true}));

// Root Route
app.get("/", (req, res) => res.send("API is Working (Hotel Management)"));

// API Routes
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
