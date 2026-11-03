export interface Assessment {
  id: string;
  classId: string;
  title: string;
  totalMarks: number;
  date: string;
}

export interface MarkRosterRow {
  learnerId: string;
  fullName: string;
  admissionNumber: string;
  score: number | null;
}