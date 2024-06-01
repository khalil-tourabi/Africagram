import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/FollowerController.js";
const followRouter = Router();

followRouter.post("/follow", followUser);
followRouter.delete("/unfollow", unfollowUser);
followRouter.get("/following", getFollowing);
followRouter.get("/followers", getFollowers);

export default followRouter;
