import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";
import dotenv from 'dotenv';
dotenv.config();

function tokenVerification(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnAuthenticatedError("No token provided");
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new UnAuthenticatedError("No token provided");
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({ error: error.message });
  }
}

export default tokenVerification;