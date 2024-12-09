import express from "express";
const userRouter = express.Router();

userRouter.put("/update/:id", updateUser());
export default userRouter;
