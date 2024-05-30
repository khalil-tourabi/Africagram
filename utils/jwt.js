import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user, secretKey) => {
  const token = jwt.sign(user, secretKey);
  return token;
}

export default generateToken;
