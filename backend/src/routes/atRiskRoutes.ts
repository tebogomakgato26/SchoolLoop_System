import { Router } from "express";
import { getAtRiskLearners } from "../controllers/atRiskController";
import { listFlags } from "../controllers/flagController";

const router = Router();

router.get("/at-risk", getAtRiskLearners);
router.get("/flags", listFlags);

export default router;