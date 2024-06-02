import { NextFunction, Response, Request } from "express";
import { InvalidCredentialsError } from "../errors";
import jwt from "jsonwebtoken";
import User from "../entity/User";

export default function authMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization) {
        throw InvalidCredentialsError;
      }
      const [type, token] = req.headers.authorization.split(" ");
      if (!type || type.toLowerCase() !== "bearer") {
        throw InvalidCredentialsError;
      }

      if (!token) {
        throw InvalidCredentialsError;
      }

      const user = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      ) as Pick<User, "id" | "email">;
      if (!user) {
        throw InvalidCredentialsError;
      }

      const actualUser = await User.findOne({ where: { id: user.id } });
      if (!actualUser) {
        throw InvalidCredentialsError;
      }
      res.locals.user = actualUser;
      return next();
    } catch (error) {
      next(error);
    }
  };
}
