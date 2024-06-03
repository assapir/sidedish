import express, { Response, Request, NextFunction } from "express";
import usersRouter from "./routes/usersRouter";
import locationRouter from "./routes/locationRouter";
import { notFoundHandler, errorHandler } from "./errors";
import weatherRouter from "./routes/weatherRouter";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/users", usersRouter);
app.use("/locations", locationRouter);
app.use("/weather", weatherRouter);
app.use("*", notFoundHandler);
app.use(errorHandler);

export default function startApp() {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  return app;
}
