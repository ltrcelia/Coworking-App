import { Request, Response } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Routes not found" });
};
