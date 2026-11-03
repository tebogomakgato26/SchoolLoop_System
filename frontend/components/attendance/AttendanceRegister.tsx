"use client";

import { useState } from "react";
import { useLearners } from "@/lib/context/LearnerContext";
import AttendanceSummary from "@/components/attendance/AttendanceSummary";
import LearnerRow from "@/components/attendance/LearnerRow";
import SaveButton from "@/components/attendance/SaveButton";

export default function AttendanceRegister() {
  const { learners, loading, error, setAttendanceStatus, saveAttendance } = useLearners();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Not yet marked counts as present, like before.
  const absentCount = learners.filter((l) => l.todayStatus === "absent").length;
  const presentCount = learners.length - absentCount;

  const handleStatusChange = (id: string, status: "present" | "absent") => {
    setAttendanceStatus(id, status);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await saveAttendance();
      setSaved(true);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Could not save attendance");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="py-10 text-center text-sm text-slate-400">Loading learners...</p>;
  if (error) return <p className="py-10 text-center text-sm text-red-600">{error}</p>;
  if (learners.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-400">No learners enrolled in this class yet.</p>;
  }

  return (
    <>
      <AttendanceSummary presentCount={presentCount} absentCount={absentCount} />

      <ul className="mt-6 divide-y divide-slate-100">
        {learners.map((learner) => (
          <LearnerRow
            key={learner.id}
            learner={{
              id: learner.id,
              name: learner.name,
              status: learner.todayStatus === "absent" ? "absent" : "present",
            }}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>

      {saveError && <p className="mt-4 text-sm text-red-600">{saveError}</p>}

      <SaveButton onSave={handleSave} saving={saving} saved={saved} />
    </>
  );
}