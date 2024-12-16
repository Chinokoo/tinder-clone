import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  getConversation,
} from "../controllers/message.controller.js";
const messageRouter = express.Router();

//middleware to use the auth function
messageRouter.use(auth);

messageRouter.post("/send", sendMessage);
messageRouter.get("/conversation/:id", getConversation);

export default messageRouter;
