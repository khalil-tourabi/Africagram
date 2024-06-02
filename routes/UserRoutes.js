import express from "express";
import {updateUser, deleteUser, getUser,} from "../controllers/UserController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const userRoute = express.Router();

userRoute.put("/updateUser", tokenVerification, updateUser).get("/getUser", getUser).delete("/deleteUser", tokenVerification, deleteUser);

export default userRoute;