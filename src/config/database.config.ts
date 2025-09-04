import { registerAs } from "@nestjs/config";

export const DatabaseConfig = registerAs("database", () => ({
  dialect: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number.parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USERNAME ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? "cd_mock",
}));
