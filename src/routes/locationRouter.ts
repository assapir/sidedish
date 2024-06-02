import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  addLocation,
  deleteLocation,
  locationSchema,
} from "../controllers/locationController";
import { zodBodyMiddleware } from "../middlewares/validationMiddleware";

const locationRouter = Router();

// All this routes are authenticated, because we need to know who the user is
locationRouter.use(authMiddleware());

locationRouter.post("/", zodBodyMiddleware(locationSchema), addLocation);
locationRouter.delete("/:id", deleteLocation);

export default locationRouter;
