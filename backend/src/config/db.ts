// src/config/db.ts

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "schoolloop",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false, // set to console.log if you want to see raw SQL while debugging
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established.");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
    process.exit(1);
  }
}
