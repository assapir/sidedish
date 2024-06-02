import express, { Response, Request, NextFunction } from "express";
import usersRouter from "./routes/usersRouter";
import locationRouter from "./routes/locationRouter";
import AppDataSource from "./data-source";
import { setupRedis } from "./redis";
import { notFoundHandler, errorHandler } from "./errors";

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
  console.log("Unable to init datasource! exiting");
  process.exit(1);
});

setupRedis().catch((error) => {
  console.log("Unable to init redis connection! exiting");
  process.exit(1);
});

if (typeof process.env.WEATHER_API_KEY !== "string") {
  console.log("WEATHER_API_KEY is not set!");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", usersRouter);
app.use("/location", locationRouter);
app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});