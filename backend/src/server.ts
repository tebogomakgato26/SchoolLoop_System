// src/server.ts

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { sequelize } from "./config/db";

// Import models so Sequelize registers them before we sync.
import "./models/Parent";
import "./models/Learner";
import "./models/Class";
import "./models/Attendance";
import "./models/Assessment";
import "./models/Mark";
import "./models/ExamTimetable";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection established.");

    await sequelize.sync({ alter: true });
    console.log("Models synced with the database.");

    app.listen(PORT, () => {
      console.log("SchoolLoop backend running on http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
