// frontend/types/principal.ts
//
// This adds registration-related types to your existing file.
// Merge these additions in alongside whatever's already there
// (AttendanceSummary, ClassAttendance, AtRiskLearner, etc.) —
// don't delete your existing types, just add these.

export type Relationship = "mother" | "father" | "guardian";

export interface ParentRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string | null;
  idNumber: string;
  relationship: Relationship;
  learners?: { id: string; fullName: string; grade: string }[];
}

export interface NewParentInput {
  fullName: string;
  phoneNumber: string;
  email: string;
  idNumber: string;
  relationship: Relationship;
}

export interface NewLearnerInput {
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: "male" | "female";
  grade: string;
  className: string;
  admissionNumber: string;
}

export interface RegisterLearnerPayload {
  learner: NewLearnerInput;
  parentId?: string;
  newParent?: NewParentInput;
}
