import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1️⃣ Get token from headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const token = authHeader.split(" ")[1];

    console.log("token : " , token);

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // 3️⃣ Attach user to request
    const user = await User.findById(decoded.id).select("-password"); // remove password
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;

    next(); // allow next route

  } catch (err) {
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};
