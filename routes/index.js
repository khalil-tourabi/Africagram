import { Router } from "express";
import postRouter from "./PostRoutes.js";
import likeRouter from "./LikesRoutes.js";
import commentRouter from "./CommentRoutes.js";
import statisticRouter from "./StatisticsRoutes.js";
const routes = Router(); 

routes.use(postRouter);
routes.use(likeRouter);
routes.use(commentRouter);
routes.use(statisticRouter);

export default routes;