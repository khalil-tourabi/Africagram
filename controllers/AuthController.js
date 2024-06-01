import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import hashPassword from "../utils/hashPassword.js";
import comparePasswords from "../utils/comparePasswords.js";
import generateToken from "../utils/jwt.js";
import {BadRequestError, UnAuthenticatedError, NotFoundError} from "../errors/index.js";
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();


const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;


    if (!firstname || !lastname || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          error: new BadRequestError("You forgot something, please check again").message,
        });
    }


    const userExists = await prisma.utilisateur.findUnique({
      where: {
        email,
      },
    });
    
    if (userExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: new BadRequestError("User already exists").message });
    }


    const hashedPassword = await hashPassword(password);


    const newUser = await prisma.utilisateur.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        isAdmin: false
      },
    });

    const token = generateToken({ user: newUser }, process.env.ACCESS_TOKEN_SECRET);


    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("Please fill all the data").message,
      });
    }

    const user = await prisma.utilisateur.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: new NotFoundError("User not found").message });
    }

    const correctPassword = await comparePasswords(password, user.password);
    if (!correctPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: new UnAuthenticatedError("Incorrect email or password").message,
      });
    }

    const token = generateToken({ user: user }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export { register, loginUser };
