import { Router } from "express";
import { getMe, getClassSummary } from "../controllers/teacherPortalController";
import { getMyFlags, flagLearner } from "../controllers/flagController";

const router = Router();

router.get("/teacher/me", getMe);
router.get("/teacher/class/:classId/summary", getClassSummary);
router.get("/teacher/flags", getMyFlags);
router.post("/teacher/flags", flagLearner);

export default router;