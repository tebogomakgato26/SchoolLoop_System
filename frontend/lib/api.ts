import { authFetch, getSession, clearSession } from "@/lib/auth";
import { ClassInfo, LearnerProfile, AttendanceStatus } from "@/types/teacher";
import { ExamEntry } from "@/types/timetable";
import { Assessment, MarkRosterRow } from "@/types/marks";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!getSession()) throw new Error("You are not logged in.");

  const res = await authFetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });

  const text = await res.text();
  let data: any = undefined;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = undefined;
  }

  if (res.status === 401) {
    clearSession();
    throw new Error("Your session has expired. Please log in again.");
  }
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  // Teacher account + classes
  getMe: () => request<{ fullName: string; classes: ClassInfo[] }>("/teacher/me"),

  // Learners with today's status and risk numbers
  getClassSummary: (classId: string) =>
    request<LearnerProfile[]>(`/teacher/class/${classId}/summary`),

  // Attendance (the server uses its own "today" when no date is sent)
  saveAttendance: (
    classId: string,
    records: { learnerId: string; status: AttendanceStatus }[]
  ) =>
    request<{ message: string }>("/attendance/mark", {
      method: "POST",
      body: JSON.stringify({ classId, records }),
    }),

  // Marks
  getAssessments: (classId: string) =>
    request<Assessment[]>(`/marks/class/${classId}/assessments`),

  createAssessment: (body: { classId: string; title: string; totalMarks: number; date: string }) =>
    request<Assessment>("/marks/assessments", { method: "POST", body: JSON.stringify(body) }),

  getMarksRoster: (assessmentId: string) =>
    request<{ totalMarks: number; roster: MarkRosterRow[] }>(
      `/marks/assessment/${assessmentId}/roster`
    ),

  submitMarks: (assessmentId: string, records: { learnerId: string; score: number }[]) =>
    request<{ message: string }>("/marks/submit", {
      method: "POST",
      body: JSON.stringify({ assessmentId, records }),
    }),

  // Flag to principal
  getFlags: () => request<{ learnerId: string; status: string }[]>("/teacher/flags"),

  flagLearner: (learnerId: string, reason: string) =>
    request<{ id: string }>("/teacher/flags", {
      method: "POST",
      body: JSON.stringify({ learnerId, reason }),
    }),

  // Published exam timetable (public endpoint)
  getExamTimetable: () => request<ExamEntry[]>("/timetable"),
};