import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminLogin, adminLogout, adminSignup } from "../controllers/adminController.js";


const adminRouter = express.Router();

// Public routes
adminRouter.post('/signup', adminSignup);
adminRouter.post('/login', adminLogin);



// Protected routes
adminRouter.get("/logout" , protect , adminLogout);

export default adminRouter;
