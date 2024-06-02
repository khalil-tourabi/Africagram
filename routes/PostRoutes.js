import { Router } from "express"
import { getPosts, createPost, updatePost, deletePost, getPostPhoto, getPostComments, getPostLikes } from "../controllers/PostController.js"
import { uploadpost } from "../middlewares/uploadPostPicture.js"
import tokenVerification from "../middlewares/tokenVerification.js";

const postRouter = Router(); 


postRouter.get("/posts",tokenVerification, getPosts)
postRouter.get("/posts/:id/photo", getPostPhoto)
postRouter.get("/posts/:id/comments", getPostComments)
postRouter.get("/posts/:id/likes", getPostLikes)
postRouter.post("/posts",tokenVerification,uploadpost.single('photo'), createPost)
postRouter.put("/posts/:id",tokenVerification, uploadpost.single('photo'), updatePost)
postRouter.delete("/posts/:id", deletePost)

export default postRouter