import { Router } from "express";
import { getWeather, weatherSchema } from "../controllers/weatherController";
import { zodQueryMiddleware } from "../middlewares/validationMiddleware";

const weatherRouter = Router();

weatherRouter.get("/", zodQueryMiddleware(weatherSchema), getWeather);

export default weatherRouter;
