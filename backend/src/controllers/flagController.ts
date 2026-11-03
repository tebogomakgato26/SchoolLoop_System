import { Request, Response } from "express";
import { LearnerFlag } from "../models/LearnerFlag";
import { Learner } from "../models/Learner";
import { Teacher } from "../models/Teacher";
import { Class } from "../models/Class";
import { Enrollment } from "../models/Enrollment";
import { AuthenticatedRequest } from "../middleware/auth";

// GET /api/teacher/flags - the learners this teacher has already flagged
export async function getMyFlags(req: AuthenticatedRequest, res: Response) {
  try {
    const flags = await LearnerFlag.findAll({ where: { teacherId: req.user!.id } });
    res.json(flags.map((f) => ({ learnerId: f.learnerId, status: f.status })));
  } catch (error) {
    console.error("getMyFlags error:", error);
    res.status(500).json({ message: "Failed to load flags." });
  }
}

// POST /api/teacher/flags   Body: { learnerId, reason }
export async function flagLearner(req: AuthenticatedRequest, res: Response) {
  try {
    const teacherId = req.user!.id;
    const { learnerId, reason } = req.body;

    if (!learnerId) return res.status(400).json({ message: "learnerId is required." });

    // The learner must be enrolled in one of THIS teacher's classes.
    const classes = await Class.findAll({ where: { teacherId }, attributes: ["id"] });
    const enrolled = await Enrollment.findOne({
      where: { learnerId, classId: classes.map((c) => c.id) },
    });
    if (!enrolled) {
      return res.status(403).json({ message: "That learner is not in one of your classes." });
    }

    const [flag, created] = await LearnerFlag.findOrCreate({
      where: { learnerId, teacherId },
      defaults: {
        learnerId,
        teacherId,
        reason: String(reason || "Flagged by teacher").slice(0, 500),
        status: "open",
      },
    });

    res.status(created ? 201 : 200).json({ id: flag.id, learnerId, status: flag.status });
  } catch (error) {
    console.error("flagLearner error:", error);
    res.status(500).json({ message: "Failed to flag learner." });
  }
}

// GET /api/principal/flags - so the principal can see what teachers flagged
export async function listFlags(_req: Request, res: Response) {
  try {
    const flags = await LearnerFlag.findAll({
      where: { status: "open" },
      include: [
        { model: Learner, as: "learner" },
        { model: Teacher, as: "teacher" },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(
      flags.map((f) => ({
        id: f.id,
        learnerName: (f as any).learner?.fullName,
        flaggedBy: (f as any).teacher?.fullName,
        reason: f.reason,
        createdAt: f.createdAt,
      }))
    );
  } catch (error) {
    console.error("listFlags error:", error);
    res.status(500).json({ message: "Failed to load flags." });
  }
}