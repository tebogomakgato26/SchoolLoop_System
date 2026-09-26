// src/routes/registrationRoutes.ts

import { Router } from "express";
import { searchParents, registerLearner } from "../controllers/registrationController";

const router = Router();

router.get("/parents/search", searchParents);
router.post("/learners/register", registerLearner);

export default router;
