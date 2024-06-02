import { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/CommentController.js";
import tokenVerification from "../middlewares/tokenVerification.js";
const commentRouter = Router();

commentRouter.post("/comment",tokenVerification ,createComment )
commentRouter.put("/comment",tokenVerification, updateComment)
commentRouter.delete("/comment",tokenVerification, deleteComment)


export default commentRouter