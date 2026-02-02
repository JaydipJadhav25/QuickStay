import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Upload path
  },
  filename: (req, file, cb) => {
    // Use timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Export upload middleware
const upload = multer({ storage });

export default upload;
