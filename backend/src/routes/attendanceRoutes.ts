// src/routes/attendanceRoutes.ts

import { Router } from "express";
import { getAttendanceSummary, getAttendanceByClass } from "../controllers/attendanceController";

const router = Router();

router.get("/attendance/summary", getAttendanceSummary);
router.get("/attendance/by-class", getAttendanceByClass);

export default router;
