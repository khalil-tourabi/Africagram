import { Router } from "express";
import { getNewsfeed } from "../controllers/NewsFeedController";

const newsfeedRouter = Router();

newsfeedRouter.get("/newsfeed", getNewsfeed);

export default newsfeedRouter;
