// src/app.ts

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import performanceRoutes from "./routes/performanceRoutes";
import atRiskRoutes from "./routes/atRiskRoutes";
import timetableRoutes from "./routes/timetableRoutes";
import classRoutes from "./routes/classRoutes";
import teacherAttendanceRoutes from "./routes/teacherAttendanceRoutes";
import teacherMarksRoutes from "./routes/teacherMarksRoutes";
import publicTimetableRoutes from "./routes/publicTimetableRoutes";
import parentRoutes from "./routes/parentRoutes";

import { verifyToken, requireRole } from "./middleware/auth";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Public - no token required
app.use("/api/auth", authRoutes);
app.use("/api", publicTimetableRoutes); // GET /api/timetable, published entries only

// Principal portal - every route here requires a valid principal token
app.use(
  "/api/principal",
  verifyToken,
  requireRole("principal"),
  registrationRoutes,
  attendanceRoutes,
  performanceRoutes,
  atRiskRoutes,
  timetableRoutes
);

// Teacher portal - every route here requires a valid teacher token
app.use(
  "/api",
  verifyToken,
  requireRole("teacher"),
  classRoutes,
  teacherAttendanceRoutes,
  teacherMarksRoutes
);

// Parent portal - every route here requires a valid parent token
app.use("/api/parent", verifyToken, requireRole("parent"), parentRoutes);

export default app;
