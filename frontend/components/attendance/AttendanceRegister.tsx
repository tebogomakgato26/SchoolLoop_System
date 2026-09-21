"use client";

import { useState } from "react";
import { useLearners } from "@/lib/context/LearnerContext";
import AttendanceSummary from "@/components/attendance/AttendanceSummary";
import LearnerRow from "@/components/attendance/LearnerRow";
import SaveButton from "@/components/attendance/SaveButton";

export default function AttendanceRegister() {
  const { learners, setAttendanceStatus } = useLearners();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const presentCount = learners.filter((l) => l.todayStatus === "present").length;
  const absentCount = learners.filter((l) => l.todayStatus === "absent").length;

  const handleStatusChange = (id: string, status: "present" | "absent") => {
    setAttendanceStatus(id, status);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaving(false);
    setSaved(true);
  };

  return (
    <>
      <AttendanceSummary presentCount={presentCount} absentCount={absentCount} />

      <ul className="mt-6 divide-y divide-slate-100">
        {learners.map((learner) => (
          <LearnerRow
            key={learner.id}
            learner={{ id: learner.id, name: learner.name, status: learner.todayStatus }}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>

      <SaveButton onSave={handleSave} saving={saving} saved={saved} />
    </>
  );
}