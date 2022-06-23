import { Request, Response } from "express";

export const getCurrentUser = async (_req: Request, res: Response) => {
    return res.send(res.locals.user);
  }