// src/routes/parentRoutes.ts

import { Router } from "express";
import {
  getMyChildren,
  getChildAttendance,
  getChildMarks,
} from "../controllers/parentController";

const router = Router();

router.get("/children", getMyChildren);
router.get("/children/:learnerId/attendance", getChildAttendance);
router.get("/children/:learnerId/marks", getChildMarks);

export default router;
