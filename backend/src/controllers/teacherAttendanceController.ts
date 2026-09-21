// src/controllers/teacherAttendanceController.ts

import { Request, Response } from "express";
import { Learner } from "../models/Learner";
import { Attendance } from "../models/Attendance";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// GET /api/attendance/class/:classId/roster?date=YYYY-MM-DD
//
// Returns every learner in the class, with their attendance status for
// that date if it's already been marked (or null if not yet marked).
// This is what the teacher's attendance page loads to render the list
// of learners with a status picker next to each name.
export async function getClassRoster(req: Request, res: Response) {
  try {
    const { classId } = req.params;
    const date = String(req.query.date || todayISO());

    const learners = await Learner.findAll({
      where: { classId },
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
//   date: "YYYY-MM-DD",         // optional, defaults to today
//   records: [
//     { learnerId: string, status: "present" | "absent" | "late" },
//     ...
//   ]
// }
//
// This is a bulk upsert — safe to call again for the same class/date
// if a teacher corrects a mistake, since each learner+class+date is
// unique (enforced by the index on Attendance).
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
