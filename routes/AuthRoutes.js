import express from "express";
import { register, loginUser } from "../controllers/AuthController.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", loginUser);

export default authRoute;