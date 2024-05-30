import { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/CommentController.js";
const commentRouter = Router();

commentRouter.post("/comment/:id",createComment )
commentRouter.put("/comment/:id", updateComment)
commentRouter.delete("/comment/:id", deleteComment)


export default commentRouter