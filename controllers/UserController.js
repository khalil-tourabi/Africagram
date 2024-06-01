import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: new BadRequestError("Please firstname, lastname and email are obligatory!").message,
      });
    }

    const user = await prisma.utilisateur.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User not found!").message,
      });
    }
    console;
    const userUpdated = await prisma.utilisateur.update({
      where: {
        id: req.user.id,
      },
      data: {
        firstname,
        lastname,
        email,
      },
    });

    return res.status(StatusCodes.OK).json(userUpdated);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const existUser = await prisma.utilisateur.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        profile: true,
      },
    });

    if (!existUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User not found!").message,
      });
    }
    const deleteUser = await prisma.utilisateur.delete({
      where: {
        id: req.user.id,
      },
      include: {
        profile: true,
        commentaires: true,
        Post: true,
        FollowerFollowing: true,
        FollowerFollower: true,
      },
    });

    return res.status(StatusCodes.OK).json({message: 'User deleted successfuly'});
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: new NotFoundError("User not found!").message,
      });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export { updateUser, deleteUser, getUser };
