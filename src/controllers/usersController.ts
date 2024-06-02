import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import User from "../entity/User";
import { InvalidCredentialsError } from "../errors";

export const userSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be at most 64 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

type UserRequestsBody = z.infer<typeof userSchema>;

export async function createUser(
  req: Request<unknown, unknown, UserRequestsBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = new User();
    user.email = email;
    user.password = await hashPassword(password);
    await user.save();
    const token = await user.generateJWT();
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<unknown, unknown, UserRequestsBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw InvalidCredentialsError;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw InvalidCredentialsError;
    }
    const token = await user.generateJWT();
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
