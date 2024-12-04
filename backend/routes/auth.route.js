import express from "express";
import {
  getProfile,
  Login,
  Logout,
  Signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//signup Route
router.post("/signup", Signup);

//Login Route
router.post("/login", Login);

//logout Route
router.post("/logout", Logout);

//get profile Route
router.get("/profile", protectRoute, getProfile);

//update profile Route
router.put("/update-profile", protectRoute, updateProfile);

export default router;
