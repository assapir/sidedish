import { Request, Response, NextFunction } from "express";
import Location from "../entity/Location";
import { z } from "zod";
import UserLocations from "../entity/UserLocations";
import User from "../entity/User";
import { AppError } from "../errors";

export const locationSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

type LocationRequestBody = z.infer<typeof locationSchema>;

export async function addLocation(
  req: Request<unknown, unknown, LocationRequestBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, latitude, longitude } = req.body;
    const { user } = res.locals;

    const newLocation = await Location.getOrCreateLocation(
      name,
      latitude,
      longitude
    );

    const userLocation = new UserLocations();
    userLocation.user = user;
    userLocation.location = newLocation;
    await userLocation.save();

    res.status(201).json({ message: "Location added", location: newLocation });
  } catch (error) {
    next(error);
  }
}

export async function deleteLocation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const location = await Location.findOneBy({ id });
    if (!location) {
      throw new AppError("Location not found", 404);
    }
    const { user } = res.locals;

    const userLocation = await UserLocations.findOneBy({
      location,
      user,
    });

    if (userLocation) {
      await userLocation.remove();
    }

    res.status(200).json({ message: "Location deleted" });
  } catch (error) {
    next(error);
  }
}
