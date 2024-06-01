import { Router } from "express";
import postRouter from "./PostRoutes.js";
import likeRouter from "./LikesRoutes.js";
import commentRouter from "./CommentRoutes.js";
import statisticRouter from "./StatisticsRoutes.js";
import followRouter from "./FollowerRoutes.js";
import newsfeedRouter from "./NewsFeedRoutes.js";
const routes = Router(); 

routes.use(postRouter);
routes.use(likeRouter);
routes.use(commentRouter);
routes.use(statisticRouter);
routes.use(followRouter);
routes.use(newsfeedRouter)

export default routes;