export interface LearnerProfile {
  id: string;
  name: string;
  grade: string;
  todayStatus: "present" | "absent";
  totalAbsences: number;
  averageScore: number;
}

export const HIGH_RISK_ABSENCE_THRESHOLD = 8;
export const HIGH_RISK_SCORE_THRESHOLD = 30;

export function isHighRisk(learner: LearnerProfile): boolean {
  return (
    learner.totalAbsences > HIGH_RISK_ABSENCE_THRESHOLD ||
    learner.averageScore < HIGH_RISK_SCORE_THRESHOLD
  );
}

export function getRiskReason(learner: LearnerProfile): string[] {
  const reasons: string[] = [];
  if (learner.totalAbsences > HIGH_RISK_ABSENCE_THRESHOLD) {
    reasons.push(`Absent ${learner.totalAbsences} times`);
  }
  if (learner.averageScore < HIGH_RISK_SCORE_THRESHOLD) {
    reasons.push(`Average score ${learner.averageScore}%`);
  }
  return reasons;
}