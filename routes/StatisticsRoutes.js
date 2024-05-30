import { Router } from "express"
import { getAVGPostsPerUser, getGenderDistribution, getTotalUsers, getTotalUsersByCountry } from "../controllers/StatisticsController.js"
import isAdmin from "../middlewares/checkingAdmin.js";
const statisticRouter = Router()

statisticRouter.get("/dashboard/totalUsers", isAdmin, getTotalUsers);
statisticRouter.get("/dashboard/userPerCountry", isAdmin, getTotalUsersByCountry);
statisticRouter.get("/dashboard/AVGPostsPerUser", isAdmin, getAVGPostsPerUser);
statisticRouter.get("/dashboard/genderDistribution", isAdmin, getGenderDistribution);

export default statisticRouter;