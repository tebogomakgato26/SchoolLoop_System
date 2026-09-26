// src/routes/teacherMarksRoutes.ts

import { Router } from "express";
import {
  getAssessmentsForClass,
  createAssessment,
  getMarksRoster,
  submitMarks,
} from "../controllers/teacherMarksController";

const router = Router();

router.get("/marks/class/:classId/assessments", getAssessmentsForClass);
router.post("/marks/assessments", createAssessment);
router.get("/marks/assessment/:assessmentId/roster", getMarksRoster);
router.post("/marks/submit", submitMarks);

export default router;
