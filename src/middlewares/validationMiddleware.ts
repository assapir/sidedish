import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";
import { AppError } from "../errors";

export function zodBodyMiddleware(schema: Schema) {
  return async (req: Request<unknown>, _res: Response, next: NextFunction) => {
    try {
      const validate = await schema.safeParseAsync(req.body);
      if (!validate.success) {
        return next(new AppError(validate.error.message, 400));
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}

export function zodQueryMiddleware(schema: Schema) {
  return async (req: Request<unknown>, _res: Response, next: NextFunction) => {
    try {
      const validate = await schema.safeParseAsync(req.query);
      if (!validate.success) {
        return next(new AppError(validate.error.message, 400));
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
