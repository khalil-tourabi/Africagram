import { Router } from "express";
import { followUser, getFollowers, getFollowing, unfollowUser } from "../controllers/FollowerController.js";
import tokenVerification from "../middlewares/tokenVerification.js";
const followRouter = Router();

followRouter.post("/follow", tokenVerification, followUser);
followRouter.delete("/unfollow", tokenVerification, unfollowUser);
followRouter.get("/following", tokenVerification, getFollowing);
followRouter.get("/followers", tokenVerification, getFollowers);

export default followRouter;
