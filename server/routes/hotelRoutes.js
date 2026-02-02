import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();

// Only logged-in users can register a hotel
// If you want, we can also restrict this to 'hotelOwner' role
hotelRouter.post("/", protect, (req, res, next) => {
  // Optional role check
  if (req.user.role !== "hotelOwner") {
    return res.status(403).json({ success: false, message: "Only hotel owners can register hotels" });
  }
  next();
}, registerHotel);

export default hotelRouter;
