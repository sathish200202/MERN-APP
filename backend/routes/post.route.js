import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPosts,
  createPost,
  deletePost,
  updateisFavourite,
  updatePost,
  getPost,
} from "../controllers/post.controller.js";

const router = express.Router();

//get the posts Route
router.get("/", protectRoute, getPosts);

//get a single post Route
router.get("/:id", protectRoute, getPost);

//create the posts Route
router.post("/create", protectRoute, createPost);

//update the posts Route
router.put("/:id", protectRoute, updatePost);

//update the isFavourite Route
router.put("/update-fav/:id", protectRoute, updateisFavourite);

//delete the posts Route
router.delete("/delete/:id", protectRoute, deletePost);

export default router;
