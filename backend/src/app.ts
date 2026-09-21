// src/app.ts

import express from "express";
import cors from "cors";

import registrationRoutes from "./routes/registrationRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import performanceRoutes from "./routes/performanceRoutes";
import atRiskRoutes from "./routes/atRiskRoutes";
import timetableRoutes from "./routes/timetableRoutes";
import classRoutes from "./routes/classRoutes";
import teacherAttendanceRoutes from "./routes/teacherAttendanceRoutes";
import teacherMarksRoutes from "./routes/teacherMarksRoutes";
import publicTimetableRoutes from "./routes/publicTimetableRoutes";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Principal portal
app.use("/api/principal", registrationRoutes);
app.use("/api/principal", attendanceRoutes);
app.use("/api/principal", performanceRoutes);
app.use("/api/principal", atRiskRoutes);
app.use("/api/principal", timetableRoutes);

// Shared and teacher facing routes, not scoped under /principal since the
// teacher and parent portals call these directly.
app.use("/api", classRoutes);
app.use("/api", teacherAttendanceRoutes);
app.use("/api", teacherMarksRoutes);
app.use("/api", publicTimetableRoutes);

export default app;
