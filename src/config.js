import { config } from "dotenv";

config();

const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";
const adminId = process.env.ADMIN_ID;
const dbConfig = {
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
};
const cldConfig = {
  apiKey: process.env.CLD_KEY,
  apiSecret: process.env.CLD_SECRET,
  cldName: process.env.CLD_NAME,
};
const jwtSecret = process.env.JWT_SECRET;
const ADMIN_COOKIE = "admin-session";

export {
  port,
  isProduction,
  adminId,
  dbConfig,
  jwtSecret,
  ADMIN_COOKIE,
  cldConfig,
};
