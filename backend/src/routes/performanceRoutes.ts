// src/routes/performanceRoutes.ts

import { Router } from "express";
import { getPerformance } from "../controllers/performanceController";

const router = Router();

router.get("/performance", getPerformance);

export default router;
