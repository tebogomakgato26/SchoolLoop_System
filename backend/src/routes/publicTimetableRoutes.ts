// src/routes/publicTimetableRoutes.ts

import { Router } from "express";
import { getPublishedTimetable } from "../controllers/timetableController";

const router = Router();

router.get("/timetable", getPublishedTimetable);

export default router;
