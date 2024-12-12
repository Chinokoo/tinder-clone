import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const userRouter = express.Router();

userRouter.put("/update", auth, updateUser);
export default userRouter;
