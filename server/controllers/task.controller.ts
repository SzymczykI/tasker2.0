import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addTask = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.title;
  const listId = req.body.listId;
  const type = req.body.type;
  const label = req.body.label;

  try {
    const task = await prisma.task.create({
      data: {
        list: {
          connect: {
            id: listId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        title,
        description,
        type,
        label,
      },
    });

    return res.status(201).json({ message: "success", task });
  } catch (error) {
    console.log(error);
    return res.status(424).json({ message: "Failed to create task" });
  }
};

export const allListTask = async (req: Request, res: Response) => {
  const listId = req.params;
  const id = listId.id;
  console.log(id)

  try {
    const task = await prisma.list.findUnique({
      where: {
        id: id,
      },
      include: {
        tasks: true,
      },
    });

    return res.status(201).json({ message: "success", task: task });
  } catch (error) {
    console.log(error);
    return res.status(424).json({ message: "Failed to fetch tasks" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
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
