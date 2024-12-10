import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  swipeRight,
  swipeLeft,
  getMatches,
  getUserProfiles,
} from "../controllers/match.controller.js";
const matchRouter = express.Router();

matchRouter.post("/swipe-right/:likedUserId", auth, swipeRight);
matchRouter.post("/swipe-left/:disLikedUserId", auth, swipeLeft);

matchRouter.get("/", auth, getMatches);
matchRouter.get("/user-profiles", auth, getUserProfiles);

export default matchRouter;
