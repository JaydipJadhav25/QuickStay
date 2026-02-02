import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";

const roomRouter = express.Router();

// Create a new room (protected, upload max 4 images)
roomRouter.post('/', upload.array("images", 4), protect, createRoom);

// Get all available rooms (public)
roomRouter.get('/', getRooms);

// Get all rooms for logged-in owner (protected)
roomRouter.get('/owner', protect, getOwnerRooms);

// Toggle room availability (protected)
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);

export default roomRouter;
