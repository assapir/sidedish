import { Router } from "express";
import { createUser, login, userSchema } from "../controllers/usersController";
import { zodBodyMiddleware } from "../middlewares/validationMiddleware";

const usersRouter = Router();

usersRouter.use(zodBodyMiddleware(userSchema));
usersRouter.put("/", createUser);
usersRouter.post("/login", login);

export default usersRouter;
