import { Response } from "express";
import { Teacher } from "../models/Teacher";
import { Class } from "../models/Class";
import { Learner } from "../models/Learner";
import { Enrollment } from "../models/Enrollment";
import { Attendance } from "../models/Attendance";
import { scoreLearner } from "../services/atRiskEngine";
import { AuthenticatedRequest } from "../middleware/auth";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// GET /api/teacher/me
// The logged-in teacher's name and the classes they teach.
export async function getMe(req: AuthenticatedRequest, res: Response) {
  try {
    const teacherId = req.user!.id;
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found." });

    const classes = await Class.findAll({
      where: { teacherId },
      order: [["grade", "ASC"], ["className", "ASC"]],
    });

    res.json({
      fullName: teacher.fullName,
      classes: classes.map((c) => ({
        id: c.id,
        grade: c.grade,
        className: c.className,
        subject: c.subject,
      })),
    });
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Failed to load teacher details." });
  }
}

// GET /api/teacher/class/:classId/summary
// One row per enrolled learner: today's status + the same risk numbers
// the principal's at-risk engine uses.
export async function getClassSummary(req: AuthenticatedRequest, res: Response) {
  try {
    const { classId } = req.params;
    const cls = await Class.findOne({ where: { id: classId, teacherId: req.user!.id } });
    if (!cls) return res.status(404).json({ message: "Class not found." });

    const enrollments = await Enrollment.findAll({ where: { classId } });
    const learners = await Learner.findAll({
      where: { id: enrollments.map((e) => e.learnerId) },
      order: [["fullName", "ASC"]],
    });

    const todayRecords = await Attendance.findAll({ where: { classId, date: todayISO() } });
    const statusById = new Map(todayRecords.map((r) => [r.learnerId, r.status]));

    const rows = await Promise.all(
      learners.map(async (l) => {
        const s = await scoreLearner(l);
        return {
          id: l.id,
          name: l.fullName,
          admissionNumber: l.admissionNumber,
          todayStatus: statusById.get(l.id) ?? null,
          daysAbsentRecent: s.absences,
          daysWindow: s.windowSize,
          termAverage: s.average,
          riskLevel: s.level,
          riskReasons: s.reasons,
        };
      })
    );

    res.json(rows);
  } catch (error) {
    console.error("getClassSummary error:", error);
    res.status(500).json({ message: "Failed to load class summary." });
  }
}