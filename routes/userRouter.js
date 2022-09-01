import express from "express";
import { userController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const { searchUsers, getUser, updateUser, follow, unFollow, suggestionUser } =
  userController;
export const userRouter = express.Router();
userRouter.get("/search", authMiddleware, searchUsers);
userRouter.get("/user/:id", authMiddleware, getUser);
userRouter.put("/user", authMiddleware, updateUser);
userRouter.put("/user/:id/follow", authMiddleware, follow);
userRouter.put("/user/:id/unfollow", authMiddleware, unFollow);
userRouter.get("/suggestionUser", authMiddleware, suggestionUser);
