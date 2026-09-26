// src/controllers/performanceController.ts

import { Request, Response } from "express";
import { Class } from "../models/Class";
import { Assessment } from "../models/Assessment";
import { Mark } from "../models/Mark";

// GET /api/principal/performance
//
// Matches the shape the Performance page's SubjectPerformance type
// expects: id, subjectName, grade, averageMark, trend, trendValue.
//
// "Trend" compares the average of the most recent assessment against
// the one before it, per class. If a class has fewer than 2 assessments
// with marks entered, trend defaults to "stable" since there's nothing
// to compare yet.
export async function getPerformance(_req: Request, res: Response) {
  try {
    const classes = await Class.findAll({
      include: [
        {
          model: Assessment,
          as: "assessments",
          separate: true,
          order: [["date", "ASC"]],
          include: [{ model: Mark, as: "marks" }],
        },
      ],
    });

    const result = classes.map((cls) => {
      const assessments = ((cls as any).assessments || []) as Array<
        Assessment & { marks?: Mark[] }
      >;

      // Average percentage per assessment (only assessments with at least one mark)
      const assessmentAverages = assessments
        .map((a) => {
          const marks = (a as any).marks || [];
          if (marks.length === 0) return null;
          const avgPct =
            marks.reduce((sum: number, m: Mark) => sum + (m.score / a.totalMarks) * 100, 0) /
            marks.length;
          return avgPct;
        })
        .filter((v): v is number => v !== null);

      const overallAverage =
        assessmentAverages.length > 0
          ? Math.round(
              assessmentAverages.reduce((sum, v) => sum + v, 0) / assessmentAverages.length
            )
          : 0;

      let trend: "up" | "down" | "stable" = "stable";
      let trendValue = 0;

      if (assessmentAverages.length >= 2) {
        const latest = assessmentAverages[assessmentAverages.length - 1];
        const previous = assessmentAverages[assessmentAverages.length - 2];
        const diff = Math.round(latest - previous);
        trendValue = Math.abs(diff);
        trend = diff > 0 ? "up" : diff < 0 ? "down" : "stable";
      }

      return {
        id: cls.id,
        subjectName: cls.subject,
        grade: cls.grade,
        averageMark: overallAverage,
        trend,
        trendValue,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("getPerformance error:", error);
    res.status(500).json({ message: "Failed to load performance data." });
  }
}
