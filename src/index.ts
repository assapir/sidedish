import AppDataSource from "./data-source";
import { setupRedis } from "./redis";
import startApp from "./setupApp";

process.on("unhandledRejection", (reason) => {
  console.error(
    `Unhandled Rejection: ${
      reason instanceof Error ? reason.message : "unknown reason"
    }`
  );
});

process.on("uncaughtException", (error: Error) => {
  console.error(`Uncaught Exception: ${error.message}`);
});

AppDataSource.initialize().catch((err) => {
  console.log("Unable to init datasource! exiting", err);
  process.exit(1);
});

setupRedis().catch((error) => {
  console.log("Unable to init redis connection! exiting", error);
  process.exit(1);
});

if (typeof process.env.WEATHER_API_KEY !== "string") {
  console.log("WEATHER_API_KEY is not set!");
  process.exit(1);
}

startApp();
