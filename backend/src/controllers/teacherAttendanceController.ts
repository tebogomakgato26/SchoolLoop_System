// src/controllers/teacherAttendanceController.ts

import { Request, Response } from "express";
import { Learner } from "../models/Learner";
import { Enrollment } from "../models/Enrollment";
import { Attendance } from "../models/Attendance";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// GET /api/attendance/class/:classId/roster?date=YYYY-MM-DD
//
// Returns every learner ENROLLED in the class (via Enrollment, not the
// old Learner.classId), with their attendance status for that date if
// it's already been marked, or null if not yet marked.
export async function getClassRoster(req: Request, res: Response) {
  try {
    const { classId } = req.params;
    const date = String(req.query.date || todayISO());

    const enrollments = await Enrollment.findAll({ where: { classId } });
    const learnerIds = enrollments.map((e) => e.learnerId);

    const learners = await Learner.findAll({
      where: { id: learnerIds },
      order: [["fullName", "ASC"]],
    });

    const existingRecords = await Attendance.findAll({
      where: { classId, date },
    });

    const statusByLearnerId = new Map(
      existingRecords.map((r) => [r.learnerId, r.status])
    );

    const roster = learners.map((l) => ({
      learnerId: l.id,
      fullName: l.fullName,
      admissionNumber: l.admissionNumber,
      status: statusByLearnerId.get(l.id) || null,
    }));

    res.json({ date, roster });
  } catch (error) {
    console.error("getClassRoster error:", error);
    res.status(500).json({ message: "Failed to load class roster." });
  }
}

// POST /api/attendance/mark
//
// Body shape:
// {
//   classId: string,
//   date: "YYYY-MM-DD",
//   records: [{ learnerId: string, status: "present" | "absent" | "late" }, ...]
// }
//
// Unchanged from before - this doesn't depend on how a learner is linked
// to the class, only that the caller says which class and which learners.
export async function markAttendance(req: Request, res: Response) {
  try {
    const { classId, date, records } = req.body;

    if (!classId || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({
        message: "classId and a non-empty records array are required.",
      });
    }

    const attendanceDate = date || todayISO();

    const results = await Promise.all(
      records.map((r: { learnerId: string; status: "present" | "absent" | "late" }) =>
        Attendance.upsert({
          learnerId: r.learnerId,
          classId,
          date: attendanceDate,
          status: r.status,
        })
      )
    );

    res.status(200).json({
      message: `Attendance saved for ${results.length} learner(s).`,
      date: attendanceDate,
    });
  } catch (error) {
    console.error("markAttendance error:", error);
    res.status(500).json({ message: "Failed to save attendance." });
  }
}