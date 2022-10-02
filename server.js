import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/authRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { messageRouter } from "./routes/messageRouter.js";
import { notificationRouter } from "./routes/notificationsRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { userRouter } from "./routes/userRouter.js";
// Socket [es6 Module]
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketServer } from "./SocketServer.js";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to db
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongoDB.🎉🎉");
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();

// Socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: true,
});
io.on("connection", (socket) => {
  SocketServer(socket);
});
// app.get("/", function (request, response) {
//   response.send("Hello, Welcome to Social media🌎🎊");
// });

// All Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", notificationRouter);
app.use("/api", messageRouter);

httpServer.listen(PORT, () => console.log(`Server Running in Port ${PORT}`));
