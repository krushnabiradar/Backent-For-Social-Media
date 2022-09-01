import { Router } from "express";
import { postController } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  unLikePost,
  getPostsUser,
  getDetailsPost,
  getPostsExplorePage,
  savePost,
  unSavePost,
  getSavePosts,
} = postController;
export const postRouter = Router();
postRouter
  .route("/posts")
  .post(authMiddleware, createPost)
  .get(authMiddleware, getPosts);

postRouter
  .route("/post/:id")
  .put(authMiddleware, updatePost)
  .get(authMiddleware, getDetailsPost)
  .delete(authMiddleware, deletePost);

postRouter.put("/post/:id/like", authMiddleware, likePost);
postRouter.put("/post/:id/unliked", authMiddleware, unLikePost);
postRouter.get("/posts_user/:id", authMiddleware, getPostsUser);
postRouter.get("/posts_explore", authMiddleware, getPostsExplorePage);
postRouter.put("/save_post/:id", authMiddleware, savePost);
postRouter.put("/unsave_post/:id", authMiddleware, unSavePost);
postRouter.get("/get_posts_save", authMiddleware, getSavePosts);
