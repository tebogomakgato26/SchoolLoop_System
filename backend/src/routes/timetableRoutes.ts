// src/routes/timetableRoutes.ts

import { Router } from "express";
import {
  getTimetable,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  publishDrafts,
} from "../controllers/timetableController";

const router = Router();

// Note: /timetable/publish is declared before /timetable/:id so that
// "publish" is never swallowed as an id parameter.
router.get("/timetable", getTimetable);
router.post("/timetable", createTimetableEntry);
router.post("/timetable/publish", publishDrafts);
router.put("/timetable/:id", updateTimetableEntry);
router.delete("/timetable/:id", deleteTimetableEntry);

export default router;
