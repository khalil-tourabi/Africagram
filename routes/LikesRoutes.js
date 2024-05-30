import { Router } from "express"
import { likePost, unlikePost } from "../controllers/LikesController.js";
const likeRouter = Router();

likeRouter.post("/aime/:id",likePost)
likeRouter.put("/aime/:id",unlikePost)

export default likeRouter 