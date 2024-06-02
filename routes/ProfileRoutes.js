import express from "express";
import { createProfile, getProfile } from "../controllers/ProfileController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const routerProfile = express.Router();

routerProfile
  .post("/createProfile", tokenVerification, createProfile)
  .get("/profile", tokenVerification, getProfile);

export default routerProfile;
