"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LearnerProfile } from "@/types/teacher";

const initialLearners: LearnerProfile[] = [
  { id: "1", name: "Amanhle Dube", grade: "Grade 9A", todayStatus: "present", totalAbsences: 2, averageScore: 82 },
  { id: "2", name: "Sipho Ndlovu", grade: "Grade 9A", todayStatus: "present", totalAbsences: 9, averageScore: 67 },
  { id: "3", name: "Lerato Khumalo", grade: "Grade 9A", todayStatus: "present", totalAbsences: 1, averageScore: 91 },
  { id: "4", name: "Nandi Cele", grade: "Grade 9A", todayStatus: "present", totalAbsences: 4, averageScore: 74 },
  { id: "5", name: "Thabo Mokoena", grade: "Grade 9A", todayStatus: "present", totalAbsences: 0, averageScore: 88 },
  { id: "6", name: "Zanele Mahlangu", grade: "Grade 9A", todayStatus: "present", totalAbsences: 10, averageScore: 55 },
  { id: "7", name: "Kagiso Sithole", grade: "Grade 9A", todayStatus: "present", totalAbsences: 3, averageScore: 38 },
  { id: "8", name: "Precious Nkosi", grade: "Grade 9A", todayStatus: "present", totalAbsences: 5, averageScore: 71 },
  { id: "9", name: "Mpho Tshabalala", grade: "Grade 9A", todayStatus: "present", totalAbsences: 2, averageScore: 79 },
  { id: "10", name: "Bongani Zulu", grade: "Grade 9A", todayStatus: "present", totalAbsences: 6, averageScore: 63 },
  { id: "11", name: "Refilwe Mathebula", grade: "Grade 9A", todayStatus: "present", totalAbsences: 1, averageScore: 95 },
  { id: "12", name: "Sibusiso Ngwenya", grade: "Grade 9A", todayStatus: "present", totalAbsences: 7, averageScore: 48 },
  { id: "13", name: "Nomvula Radebe", grade: "Grade 9A", todayStatus: "present", totalAbsences: 0, averageScore: 84 },
  { id: "14", name: "Tshepo Maluleke", grade: "Grade 9A", todayStatus: "present", totalAbsences: 11, averageScore: 42 },
  { id: "15", name: "Ayanda Buthelezi", grade: "Grade 9A", todayStatus: "present", totalAbsences: 4, averageScore: 35 },
];

interface LearnerContextValue {
  learners: LearnerProfile[];
  setAttendanceStatus: (id: string, status: "present" | "absent") => void;
  setScore: (id: string, score: number) => void;
}

const LearnerContext = createContext<LearnerContextValue | null>(null);

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [learners, setLearners] = useState<LearnerProfile[]>(initialLearners);

  const setAttendanceStatus = (id: string, status: "present" | "absent") => {
    setLearners((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        if (l.todayStatus === status) return l;

        const delta = status === "absent" ? 1 : -1;
        return {
          ...l,
          todayStatus: status,
          totalAbsences: Math.max(0, l.totalAbsences + delta),
        };
      })
    );
  };

  const setScore = (id: string, score: number) => {
    setLearners((prev) =>
      prev.map((l) => (l.id === id ? { ...l, averageScore: score } : l))
    );
  };

  return (
    <LearnerContext.Provider value={{ learners, setAttendanceStatus, setScore }}>
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearners() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error("useLearners must be used within a LearnerProvider");
  }
  return context;
}