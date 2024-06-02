import { AppError } from "./errors";

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";
const NUMBER_OF_DAYS = 5;

type DayForecastData = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
  };
};

type WeatherData = {
  location: {
    name: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
  };
  forecast: {
    forecastday: DayForecastData[];
  };
};

export async function getWeatherForLocation(
  latitude: number,
  longitude: number
) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${latitude},${longitude}&days=${NUMBER_OF_DAYS}&aqi=no&key=${process.env.WEATHER_API_KEY}`
    );
    const data = (await response.json()) as WeatherData;
    const location = {
      name: data.location.name,
      latitude: data.location.lat,
      longitude: data.location.lon,
    };
    const current = data.current.temp_c;
    return {
      now: data.location.localtime,
      location,
      current,
      forecast: data.forecast.forecastday.map((forecast) => ({
        date: forecast.date,
        max: forecast.day.maxtemp_c,
        min: forecast.day.mintemp_c,
        average: forecast.day.avgtemp_c,
      })),
    };
  } catch (error) {
    console.error("Unable to get the weather from weatherAPI", error);
    throw new AppError("Unable to get the weather from weatherAPI", 500);
  }
}
