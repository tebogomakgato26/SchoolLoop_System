// src/controllers/atRiskController.ts

import { Request, Response } from "express";
import { runAtRiskScan } from "../services/atRiskEngine";

// GET /api/principal/at-risk
//
// Runs the scan on request. For a school-sized dataset this is fast
// enough, and it means the principal always sees current numbers. If the
// learner count ever grows enough to make this slow, move the scan to a
// scheduled job (node-cron) and have this endpoint just read the stored
// atRiskStatus instead of recomputing.
export async function getAtRiskLearners(_req: Request, res: Response) {
  try {
    const flagged = await runAtRiskScan();
    res.json(flagged);
  } catch (error) {
    console.error("getAtRiskLearners error:", error);
    res.status(500).json({ message: "Failed to load at-risk learners." });
  }
}
