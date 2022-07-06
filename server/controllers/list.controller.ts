import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addList = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const title = req.body.title;

  try {
    const list = await prisma.list.create({
      data: {
        title: title,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res.status(201).json({ message: "success", list: list });
  } catch (error) {
    console.log(error);
    return res.status(424).json({ message: "Failed to create list" });
  }
};

export const updateList = async (req: Request, res: Response) => {
  const listId = req.params.id;
  const newTitle = req.body.title;

  try {
    const list = await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        title: newTitle,
      },
    });

    return res.status(201).json({ message: "success", list: list });
  } catch (error) {
    console.log(error);
    return res.status(424).json({ message: "Failed to update list" });
  }
};

export const allUserLists = async (req: Request, res: Response) => {
  const userId = req.params;
  const id = userId.id;

  try {
    const list = await prisma.user.findMany({
      where: {
        id: id,
      },
      include: {
        lists: true,
      },
    });

    return res.status(201).json({ message: "success", list: list });
  } catch (error) {
    console.log(error);
    return res.status(424).json({ message: "Failed to fetch lists" });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const listId = req.params;
  const id = listId.id;

  try {
    await prisma.list.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(424).json({ message: "Delete failed" });
  }
};
