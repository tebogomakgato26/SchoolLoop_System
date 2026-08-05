// src/server.ts

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB, sequelize } from "./config/db";

// Import models so Sequelize registers them before we sync
import "./models/Parent";
import "./models/Learner";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  // In development this creates/updates tables to match your models.
  // Once your real schema exists, switch this off and manage tables
  // via proper migrations instead.
  await sequelize.sync({ alter: true });
  console.log("✅ Models synced with the database.");

  app.listen(PORT, () => {
    console.log(`🚀 SchoolLoop backend running on http://localhost:${PORT}`);
  });
}

start();
