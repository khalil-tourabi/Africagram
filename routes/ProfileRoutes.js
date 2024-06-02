import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createProfile, getProfile } from "../controllers/ProfileController.js";

const routerProfile = express.Router();

routerProfile
  .post("/createProfile", verifyToken, createProfile)
  .get("/profile", verifyToken, getProfile);

export default routerProfile;
