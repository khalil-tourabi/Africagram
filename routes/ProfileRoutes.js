import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createProfile, getProfile } from "../controllers/ProfileController.js";

const routerProfile = express.Router();

routerProfile
  .post("/createProfile", createProfile)
  .get("/profile", getProfile);

export default routerProfile;
