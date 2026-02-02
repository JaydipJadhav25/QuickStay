import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id; // ✅ From manual JWT middleware

    // Check if User Already Registered a Hotel
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.status(400).json({ success: false, message: "Hotel Already Registered" });
    }

    // Create new hotel
    await Hotel.create({ name, address, contact, city, owner });

    // Update user role to "hotelOwner"
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
