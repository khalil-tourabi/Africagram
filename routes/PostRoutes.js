import { Router } from "express"
import { getPosts, createPost, updatePost, deletePost, getPostPhoto, getPostComments, getPostLikes } from "../controllers/PostController.js"
import { uploadpost } from "../middlewares/uploadPostPicture.js"

const postRouter = Router(); 


postRouter.get("/posts", getPosts)
postRouter.get("/posts/:id/photo", getPostPhoto)
postRouter.get("/posts/:id/comments", getPostComments)
postRouter.get("/posts/:id/likes", getPostLikes)
postRouter.post("/posts/:id",uploadpost.single('photo'), createPost)
postRouter.put("/posts/:id",uploadpost.single('photo'), updatePost)
postRouter.delete("/posts/:id", deletePost)

export default postRouter