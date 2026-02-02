import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  getUserData,
  storeRecentSearchedCities
} from "../controllers/userController.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/signup', signup);
userRouter.post('/login', login);

// Protected routes
userRouter.get('/', protect, getUserData);
userRouter.post('/recent-cities', protect, storeRecentSearchedCities);

export default userRouter;
