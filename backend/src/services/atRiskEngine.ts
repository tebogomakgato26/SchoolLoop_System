// src/services/atRiskEngine.ts
//
// The at-risk engine is the feature from the project brief: warning signs
// (chronic absence, falling marks) are usually present months before a
// learner disengages, but nobody tracks them systematically.
//
// This reads the Attendance and Mark tables that already exist, scores
// each learner, writes the result back to Learner.atRiskStatus, and
// returns the flagged learners for the principal's Alerts page.

import { Learner } from "../models/Learner";
import { Attendance } from "../models/Attendance";
import { Mark } from "../models/Mark";
import { Assessment } from "../models/Assessment";
import { Class } from "../models/Class";

// How many of the learner's most recent attendance records to look at.
const ATTENDANCE_WINDOW = 10;

// Thresholds. These are deliberately in one place so they are easy to
// defend in a writeup and easy to tune later.
const HIGH_ABSENCE = 7; // absences in the window
const MEDIUM_ABSENCE = 4;
const HIGH_AVERAGE = 40; // percent
const MEDIUM_AVERAGE = 45;

export type ComputedRisk = {
  id: string;
  name: string;
  grade: string;
  riskLevel: "high" | "medium";
  daysAbsentRecent: number;
  daysWindow: number;
  termAverage: number;
  flaggedReason: string;
};

type Scored = {
  learner: Learner;
  absences: number;
  windowSize: number;
  average: number;
  level: "none" | "medium" | "high";
  reasons: string[];
};

async function scoreLearner(learner: Learner): Promise<Scored> {
  // 1. Recent attendance: newest first, capped at the window size.
  const recent = await Attendance.findAll({
    where: { learnerId: learner.id },
    order: [["date", "DESC"]],
    limit: ATTENDANCE_WINDOW,
  });

  const windowSize = recent.length;
  const absences = recent.filter((r) => r.status === "absent").length;

  // 2. Term average across every mark the learner has, as a percentage
  //    of each assessment's total (assessments are not all out of 100).
  const marks = await Mark.findAll({
    where: { learnerId: learner.id },
    include: [{ model: Assessment, as: "assessment" }],
  });

  const percentages = marks
    .map((m) => {
      const assessment = (m as any).assessment as Assessment | undefined;
      if (!assessment || !assessment.totalMarks) return null;
      return (m.score / assessment.totalMarks) * 100;
    })
    .filter((v): v is number => v !== null);

  const average =
    percentages.length > 0
      ? Math.round(percentages.reduce((sum, v) => sum + v, 0) / percentages.length)
      : 0;

  // 3. Score. A learner with no attendance history yet is not flagged,
  //    otherwise every newly registered learner would show as at risk.
  const reasons: string[] = [];
  let level: "none" | "medium" | "high" = "none";

  if (windowSize === 0) {
    return { learner, absences, windowSize, average, level, reasons };
  }

  const chronicAbsence = absences >= HIGH_ABSENCE;
  const risingAbsence = absences >= MEDIUM_ABSENCE;
  const hasMarks = percentages.length > 0;
  const failingBadly = hasMarks && average < HIGH_AVERAGE;
  const falling = hasMarks && average < MEDIUM_AVERAGE;

  if (chronicAbsence || (risingAbsence && failingBadly)) {
    level = "high";
  } else if (risingAbsence || falling) {
    level = "medium";
  }

  if (chronicAbsence) {
    reasons.push("Chronic absence");
  } else if (risingAbsence) {
    reasons.push("Rising absence trend");
  }

  if (failingBadly) {
    reasons.push("term average below " + HIGH_AVERAGE + "%");
  } else if (falling) {
    reasons.push("term average below " + MEDIUM_AVERAGE + "%");
  }

  return { learner, absences, windowSize, average, level, reasons };
}

function buildReason(scored: Scored): string {
  if (scored.reasons.length === 0) return "Flagged by attendance and marks review";
  // "Chronic absence and term average below 40%"
  return scored.reasons.join(" and ");
}

// Scores every learner, persists atRiskStatus, and returns only the
// learners that came out as medium or high.
export async function runAtRiskScan(): Promise<ComputedRisk[]> {
  const learners = await Learner.findAll({
    include: [{ model: Class, as: "class", required: false }],
  });

  const flagged: ComputedRisk[] = [];

  for (const learner of learners) {
    const scored = await scoreLearner(learner);

    // Persist so the value is available to other queries and portals,
    // not just this response.
    if (learner.atRiskStatus !== scored.level) {
      await learner.update({ atRiskStatus: scored.level });
    }

    if (scored.level === "none") continue;

    const cls = (learner as any).class as Class | undefined;
    const gradeLabel = cls?.className
      ? "Grade " + cls.className
      : learner.grade;

    flagged.push({
      id: learner.id,
      name: learner.fullName,
      grade: gradeLabel,
      riskLevel: scored.level,
      daysAbsentRecent: scored.absences,
      daysWindow: scored.windowSize,
      termAverage: scored.average,
      flaggedReason: buildReason(scored),
    });
  }

  // Highest risk first, then most absences.
  flagged.sort((a, b) => {
    if (a.riskLevel !== b.riskLevel) return a.riskLevel === "high" ? -1 : 1;
    return b.daysAbsentRecent - a.daysAbsentRecent;
  });

  return flagged;
}
