import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const InvalidCredentialsError = new AppError("Invalid Credentials", 401);

// Not found handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
};

// General error handler
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};
