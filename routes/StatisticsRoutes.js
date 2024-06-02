import { Router } from "express"
import { getAVGPostsPerUser, getGenderDistribution, getTotalUsers, getTotalUsersByCountry } from "../controllers/StatisticsController.js"
import isAdmin from "../middlewares/checkingAdmin.js";
import tokenVerification from "../middlewares/tokenVerification.js";
const statisticRouter = Router()

statisticRouter.get("/dashboard/totalUsers",tokenVerification, isAdmin, getTotalUsers);
statisticRouter.get("/dashboard/userPerCountry",tokenVerification, isAdmin, getTotalUsersByCountry);
statisticRouter.get("/dashboard/AVGPostsPerUser",tokenVerification, isAdmin, getAVGPostsPerUser);
statisticRouter.get("/dashboard/genderDistribution",tokenVerification, isAdmin, getGenderDistribution);

export default statisticRouter;