import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";

const pathPrefix =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? `src/`
    : "dist/src/";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  uuidExtension: "uuid-ossp",
  migrationsRun: true,
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  entities: [path.join(path.resolve(), pathPrefix, "/entity/**/*.{js,ts}")],
  migrations: [
    path.join(path.resolve(), pathPrefix, "/migration/**/*.{js,ts}"),
  ],
  subscribers: [
    path.join(path.resolve(), pathPrefix, "/subscriber/**/*.{js,ts}"),
  ],
});

export default AppDataSource;
