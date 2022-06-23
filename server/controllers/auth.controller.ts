import { Request, Response } from 'express';
import { comparePassword } from '../utils/password';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  // const hashedPassword = await hashPassword(password);
  console.log(req.body)
  try {
    const userPresent = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userPresent) {
      return res
        .status(409)
        .json({ message: 'User with email already exists' });
    }
    await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });
    return res.status(201).json({ message: 'success' });
  } catch (error) {
    console.log(error)
    return res.status(424).json({ message: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }

    const passwordVerified = await comparePassword(user.password, password);

    if (!passwordVerified) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(424).json({ message: 'Login failed' });
  }
};


export const deleteAccount = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }

    const passwordVerified = await comparePassword(user.password, password);

    if (passwordVerified === false) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await prisma.user.delete({
      where: {
        email: email,
      },
    });

    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(424).json({ message: 'Delete failed' });
  }
};

export const logout = (_req: Request, res: Response) => {
  return res.status(200).json({ OK: true });
};