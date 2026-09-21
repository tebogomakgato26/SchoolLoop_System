// src/controllers/attendanceController.ts

import { Request, Response } from "express";
import { Attendance } from "../models/Attendance";
import { Class } from "../models/Class";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// GET /api/principal/attendance/summary?date=YYYY-MM-DD
// Matches the shape the dashboard's KPI cards expect: present, absent, late, total, isLive
export async function getAttendanceSummary(req: Request, res: Response) {
  try {
    const date = String(req.query.date || todayISO());

    const records = await Attendance.findAll({ where: { date } });

    const present = records.filter((r) => r.status === "present").length;
    const absent = records.filter((r) => r.status === "absent").length;
    const late = records.filter((r) => r.status === "late").length;
    const total = present + absent + late;

    res.json({
      present,
      absent,
      late,
      total,
      isLive: date === todayISO(),
    });
  } catch (error) {
    console.error("getAttendanceSummary error:", error);
    res.status(500).json({ message: "Failed to load attendance summary." });
  }
}

// GET /api/principal/attendance/by-class?date=YYYY-MM-DD
// Matches the shape the dashboard's chart + table expect.
export async function getAttendanceByClass(req: Request, res: Response) {
  try {
    const date = String(req.query.date || todayISO());

    const classes = await Class.findAll({
      include: [
        {
          model: Attendance,
          as: "attendanceRecords",
          where: { date },
          required: false, // still show classes with zero records marked yet
        },
      ],
    });

    const result = classes.map((cls) => {
      const records = (cls as any).attendanceRecords || [];
      const present = records.filter((r: any) => r.status === "present").length;
      const absent = records.filter((r: any) => r.status === "absent").length;
      const late = records.filter((r: any) => r.status === "late").length;
      const markedTotal = present + absent + late;
      const percentage = markedTotal > 0 ? Math.round((present / markedTotal) * 100) : 0;

      return {
        id: cls.id,
        className: `${cls.grade} - ${cls.subject}`,
        teacherName: cls.teacherName,
        present,
        absent,
        late,
        percentage,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("getAttendanceByClass error:", error);
    res.status(500).json({ message: "Failed to load attendance by class." });
  }
}
