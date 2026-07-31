import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  synchronize: false,
  logging: true,

  // Any future entity should be placed under src/ and named *.entity.ts
  // so TypeORM can discover it automatically.
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/database/migrations/*.ts"],

  subscribers: [],
});