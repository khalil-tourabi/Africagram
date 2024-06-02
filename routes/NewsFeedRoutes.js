import { Router } from "express";
import { getNewsfeed } from "../controllers/NewsFeedController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const newsfeedRouter = Router();

newsfeedRouter.get("/newsfeed", tokenVerification, getNewsfeed);

export default newsfeedRouter;
