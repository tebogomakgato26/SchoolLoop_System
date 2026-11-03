export type AttendanceStatus = "present" | "absent" | "late";
export type RiskLevel = "none" | "medium" | "high";

export interface ClassInfo {
  id: string;
  grade: string;
  className: string;
  subject: string;
}

export interface LearnerProfile {
  id: string;
  name: string;
  admissionNumber: string;
  todayStatus: AttendanceStatus | null;
  daysAbsentRecent: number;
  daysWindow: number;
  termAverage: number;
  riskLevel: RiskLevel;
  riskReasons: string[];
}

export function isHighRisk(learner: LearnerProfile): boolean {
  return learner.riskLevel === "high";
}

export function isAtRisk(learner: LearnerProfile): boolean {
  return learner.riskLevel !== "none";
}

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function getRiskReason(learner: LearnerProfile): string[] {
  return learner.riskReasons.map((r) => {
    const lower = r.toLowerCase();
    if (lower.includes("absence")) {
      return `${capitalise(r)} (${learner.daysAbsentRecent} of last ${learner.daysWindow} days)`;
    }
    if (lower.includes("average")) {
      return `Term average ${learner.termAverage}%`;
    }
    return capitalise(r);
  });
}