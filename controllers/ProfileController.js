import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const prisma = new PrismaClient();

const createProfile = async (req, res) => {
  try {
    const { sexe, pays, ville } = req.body;
    const userId = req.user.id;
    if (!sexe || !pays || !ville) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("sexe, pays and ville are required!").message,
      });
    }

    const existingProfile = await prisma.profile.findFirst({
      where: {
        id_utilisateur: userId,
      },
    });
    if (existingProfile) {
      return res.status(StatusCodes.CONFLICT).json({
        error: new BadRequestError("Profile already exists!").message,
      });
    }

    const profile = await prisma.profile.create({
      data: {
        id_utilisateur: userId,
        sexe,
        pays,
        ville,
      },
    });

    return res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        id_utilisateur: req.user.id,
      },
    });

    if (!profile) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("Profile does not exist!").message,
      });
    }

    return res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export { createProfile, getProfile };
