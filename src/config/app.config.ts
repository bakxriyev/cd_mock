import { registerAs } from "@nestjs/config";

export const AppConfig = registerAs("app", () => ({
  port: Number.parseInt(process.env.PORT ),
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
  uploadDest: process.env.UPLOAD_DEST ?? "./uploads",
  maxFileSize: Number.parseInt(process.env.MAX_FILE_SIZE ?? "10485760"), // 10MB default
}));
