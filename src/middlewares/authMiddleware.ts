import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import User from "../entity/User";

export default function authMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        throw new AppError("Invalid Credentials", 401);
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw new AppError("Invalid Credentials", 401);
      }

      const user = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      ) as Pick<User, "id" | "email">;
      if (!user) {
        throw new AppError("Invalid Credentials", 401);
      }

      const actualUser = User.findOne({ where: { id: user.id } });
      res.locals.user = actualUser;
      return next();
    } catch (error) {
      next(error);
    }
  };
}
