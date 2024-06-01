import { Router } from "express";
import { likePost, unlikePost } from "../controllers/LikesController.js";
const likeRouter = Router();

likeRouter.post("/like", likePost);
likeRouter.delete("/unlike", unlikePost);

export default likeRouter;
