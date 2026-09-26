// src/routes/teacherAttendanceRoutes.ts

import { Router } from "express";
import { getClassRoster, markAttendance } from "../controllers/teacherAttendanceController";

const router = Router();

router.get("/attendance/class/:classId/roster", getClassRoster);
router.post("/attendance/mark", markAttendance);

export default router;
