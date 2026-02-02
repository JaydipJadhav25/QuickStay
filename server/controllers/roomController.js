import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
import User from "../models/User.js";

// API to create a new room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.user._id }); // ✅ manual JWT

    if (!hotel) {
      return res.status(404).json({ success: false, message: "No Hotel found" });
    }

    // Upload images to Cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: "Room Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all available rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true }).populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "image",
      },
    }).sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all rooms for a specific hotel (owner)
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.user._id }); // ✅ manual JWT
    if (!hotelData) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
