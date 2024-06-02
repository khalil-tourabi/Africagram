import { Router } from "express";
import { likePost, unlikePost } from "../controllers/LikesController.js";
import tokenVerification from "../middlewares/tokenVerification.js";
const likeRouter = Router();

likeRouter.post("/like",tokenVerification , likePost);
likeRouter.delete("/unlike",tokenVerification, unlikePost);

export default likeRouter;
