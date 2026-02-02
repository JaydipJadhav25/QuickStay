import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  getUserData,
  storeRecentSearchedCities,
  logout
} from "../controllers/userController.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', signup);
userRouter.post('/login', login);



// Protected routes
userRouter.get("/logout" , protect , logout);
userRouter.get('/', protect, getUserData);
userRouter.post('/recent-cities', protect, storeRecentSearchedCities);

export default userRouter;
