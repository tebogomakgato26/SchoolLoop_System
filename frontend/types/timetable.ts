export interface ExamEntry {
  id: string;
  subject: string;
  grade: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  status: "draft" | "published";
}