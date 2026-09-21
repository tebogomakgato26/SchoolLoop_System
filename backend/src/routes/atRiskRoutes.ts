// src/routes/atRiskRoutes.ts

import { Router } from "express";
import { getAtRiskLearners } from "../controllers/atRiskController";

const router = Router();

router.get("/at-risk", getAtRiskLearners);

export default router;
