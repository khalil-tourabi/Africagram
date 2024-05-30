import { Router } from "express"
import { getAVGPostsPerUser, getGenderDistribution, getTotalUsers, getTotalUsersByCountry } from "../controllers/StatisticsController.js"
const statisticRouter = Router()

statisticRouter.get("/dashboard/totalUsers", getTotalUsers)
statisticRouter.get("/dashboard/userPerCountry", getTotalUsersByCountry)
statisticRouter.get("/dashboard/AVGPostsPerUser", getAVGPostsPerUser)
statisticRouter.get("/dashboard/genderDistribution", getGenderDistribution)

export default statisticRouter;