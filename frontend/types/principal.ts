// frontend/types/principal.ts

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  total: number;
  isLive: boolean;
}

export interface ClassAttendance {
  id: string;
  className: string; // e.g. "Grade 9A - Mathematics"
  teacherName: string; // e.g. "Ms Dlamini"
  present: number;
  absent: number;
  late: number;
  percentage: number; // e.g. 94
}

export type RiskLevel = "high" | "medium";

export interface AtRiskLearner {
  id: string;
  name: string;
  grade: string; // e.g. "Grade 10B"
  riskLevel: RiskLevel;
  daysAbsentRecent: number; // e.g. 8
  daysWindow: number; // e.g. 10 -> "8 of last 10 days"
  termAverage: number; // e.g. 34
  flaggedReason: string; // e.g. "Chronic absence + declining marks"
}

export type Trend = "up" | "down" | "stable";

export interface SubjectPerformance {
  id: string;
  subjectName: string; // e.g. "Mathematics"
  grade: string; // e.g. "Grade 9A"
  averageMark: number; // e.g. 68
  trend: Trend;
  trendValue: number; // e.g. 4 (percentage points changed since last term)
}

export type ExamStatus = "draft" | "published";

export interface ExamTimetableEntry {
  id: string;
  subject: string;
  grade: string;
  date: string; // e.g. "2026-08-04"
  time: string; // e.g. "09:00 - 11:00"
  venue: string;
  status: ExamStatus;
}
