"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { LearnerProfile, ClassInfo } from "@/types/teacher";
import { api } from "@/lib/api";

interface LearnerContextValue {
  teacherName: string;
  classes: ClassInfo[];
  selectedClassId: string | null;
  selectedClass: ClassInfo | null;
  selectClass: (id: string) => void;
  learners: LearnerProfile[];
  flaggedIds: string[];
  loading: boolean;
  error: string | null;
  setAttendanceStatus: (id: string, status: "present" | "absent") => void;
  saveAttendance: () => Promise<void>;
  flagLearner: (id: string, reason: string) => Promise<void>;
  reload: () => Promise<void>;
}

const LearnerContext = createContext<LearnerContextValue | null>(null);

const message = (e: unknown, fallback: string) =>
  e instanceof Error ? e.message : fallback;

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [teacherName, setTeacherName] = useState("");
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [learners, setLearners] = useState<LearnerProfile[]>([]);
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadClass = useCallback(async (classId: string) => {
    try {
      setError(null);
      const [summary, flags] = await Promise.all([
        api.getClassSummary(classId),
        api.getFlags(),
      ]);
      setLearners(summary);
      setFlaggedIds(flags.map((f) => f.learnerId));
    } catch (e) {
      setError(message(e, "Could not load learners"));
    } finally {
      setLoading(false);
    }
  }, []);

  // 1. Who is the teacher, and which classes do they have?
  useEffect(() => {
    api
      .getMe()
      .then((me) => {
        setTeacherName(me.fullName);
        setClasses(me.classes);
        if (me.classes.length > 0) setSelectedClassId(me.classes[0].id);
        else setLoading(false);
      })
      .catch((e) => {
        setError(message(e, "Could not load your account"));
        setLoading(false);
      });
  }, []);

  // 2. Load the learners whenever the selected class changes.
  useEffect(() => {
    if (!selectedClassId) return;
    setLoading(true);
    loadClass(selectedClassId);
  }, [selectedClassId, loadClass]);

  const reload = useCallback(async () => {
    if (selectedClassId) await loadClass(selectedClassId);
  }, [selectedClassId, loadClass]);

  const setAttendanceStatus = (id: string, status: "present" | "absent") => {
    setLearners((prev) =>
      prev.map((l) => (l.id === id ? { ...l, todayStatus: status } : l))
    );
  };

  const saveAttendance = async () => {
    if (!selectedClassId) return;
    await api.saveAttendance(
      selectedClassId,
      learners.map((l) => ({ learnerId: l.id, status: l.todayStatus ?? "present" }))
    );
    await loadClass(selectedClassId); // refresh absence counts and risk levels
  };

  const flagLearner = async (id: string, reason: string) => {
    await api.flagLearner(id, reason);
    setFlaggedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const selectedClass = classes.find((c) => c.id === selectedClassId) ?? null;

  return (
    <LearnerContext.Provider
      value={{
        teacherName,
        classes,
        selectedClassId,
        selectedClass,
        selectClass: setSelectedClassId,
        learners,
        flaggedIds,
        loading,
        error,
        setAttendanceStatus,
        saveAttendance,
        flagLearner,
        reload,
      }}
    >
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