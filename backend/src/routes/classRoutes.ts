// src/routes/classRoutes.ts

import { Router } from "express";
import { getAllClasses } from "../controllers/classController";

const router = Router();

router.get("/classes", getAllClasses);

export default router;
