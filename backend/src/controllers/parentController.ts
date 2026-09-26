// src/controllers/parentController.ts
//
// Every handler here trusts req.user.id (set by verifyToken from the JWT)
// as the logged in parent's own id, and only ever returns data for
// learners whose parentId matches that id. This is the actual security
// boundary for the parent portal: a parent must never be able to see
// another family's child by guessing or changing a learnerId in the URL.

import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { Learner } from "../models/Learner";
import { Class } from "../models/Class";
import { Attendance } from "../models/Attendance";
import { Mark } from "../models/Mark";
import { Assessment } from "../models/Assessment";

async function assertOwnedLearner(parentId: string, learnerId: string) {
  const learner = await Learner.findOne({
    where: { id: learnerId, parentId },
    include: [{ model: Class, as: "class", required: false }],
  });
  return learner;
}

// GET /api/parent/children
export async function getMyChildren(req: AuthenticatedRequest, res: Response) {
  try {
    const parentId = req.user!.id;
    const children = await Learner.findAll({
      where: { parentId },
      include: [{ model: Class, as: "class", required: false }],
    });

    res.json(
      children.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        grade: c.grade,
        className: c.className,
        admissionNumber: c.admissionNumber,
        atRiskStatus: c.atRiskStatus,
      }))
    );
  } catch (error) {
    console.error("getMyChildren error:", error);
    res.status(500).json({ message: "Failed to load your children." });
  }
}

// GET /api/parent/children/:learnerId/attendance
export async function getChildAttendance(req: AuthenticatedRequest, res: Response) {
  try {
    const learner = await assertOwnedLearner(req.user!.id, req.params.learnerId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found." });
    }

    const records = await Attendance.findAll({
      where: { learnerId: learner.id },
      order: [["date", "DESC"]],
      limit: 30,
    });

    res.json(records.map((r) => ({ date: r.date, status: r.status })));
  } catch (error) {
    console.error("getChildAttendance error:", error);
    res.status(500).json({ message: "Failed to load attendance." });
  }
}

// GET /api/parent/children/:learnerId/marks
export async function getChildMarks(req: AuthenticatedRequest, res: Response) {
  try {
    const learner = await assertOwnedLearner(req.user!.id, req.params.learnerId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found." });
    }

    const marks = await Mark.findAll({
      where: { learnerId: learner.id },
      include: [{ model: Assessment, as: "assessment" }],
    });

    res.json(
      marks.map((m) => {
        const assessment = (m as any).assessment as Assessment;
        return {
          assessmentTitle: assessment?.title,
          date: assessment?.date,
          score: m.score,
          totalMarks: assessment?.totalMarks,
        };
      })
    );
  } catch (error) {
    console.error("getChildMarks error:", error);
    res.status(500).json({ message: "Failed to load marks." });
  }
}
