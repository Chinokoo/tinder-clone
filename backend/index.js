import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http";
import path from "path";

//routes
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import matchRouter from "./routes/match.route.js";
import { connectToDB } from "./config/database_connection.js";
import { initializeSocket } from "./socket/socket.server.js";

//config
dotenv.config({ path: "./.env" });
const __dirname = path.resolve();
//express
const app = express();
const httpServer = createServer(app);

//initializing socket io
initializeSocket(httpServer);

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

//server
const PORT = process.env.PORT || 5000;
//change to http server.
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
