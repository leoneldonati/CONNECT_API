import { config } from "dotenv";

config();

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const adminId = process.env.ADMIN_ID;
const dbConfig = {
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
};

export { port, isProduction, adminId, dbConfig };
