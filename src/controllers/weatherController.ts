import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getWeatherForLocation } from "../wetherAPI";
import { normalizeCoordinates } from "../entity/Location";

export const weatherSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

type WeatherQueryParams = z.infer<typeof weatherSchema>;

export async function getWeather(
  req: Request<unknown, unknown, unknown, WeatherQueryParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const { latitude, longitude } = req.query;
    const weather = await getWeatherForLocation(
      normalizeCoordinates(parseFloat(latitude)),
      normalizeCoordinates(parseFloat(longitude))
    );
    res.status(200).json(weather);
  } catch (error) {
    next(error);
  }
}
