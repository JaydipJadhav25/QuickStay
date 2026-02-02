import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// Public route to check room availability
bookingRouter.post('/check-availability', checkAvailabilityAPI);

// Protected routes (require JWT)
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);

export default bookingRouter;
