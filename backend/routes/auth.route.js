import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", auth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default authRouter;
