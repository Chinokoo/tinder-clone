import express from "express";
import dotenv from "dotenv";

//routes
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js`";
import matchRouter from "./routes/match.route.js";

//config
dotenv.config({ path: "./.env" });
//express
const app = express();

//middlewares
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/messages", messageRouter);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
