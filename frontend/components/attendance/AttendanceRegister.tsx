"use client";

import { useState } from "react";
import { Learner, Status } from "@/types/attendance";
import AttendanceSummary from "@/components/attendance/AttendanceSummary";
import LearnerRow from "@/components/attendance/LearnerRow";
import SaveButton from "@/components/attendance/SaveButton";

const initialLearners: Learner[] = [
  { id: "1", name: "Amanhle Dube", status: "present" },
  { id: "2", name: "Sipho Ndlovu", status: "present" },
  { id: "3", name: "Lerato Khumalo", status: "present" },
  { id: "4", name: "Nandi Cele", status: "present" },
];

export default function AttendanceRegister() {
  const [learners, setLearners] = useState<Learner[]>(initialLearners);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const presentCount = learners.filter((l) => l.status === "present").length;
  const absentCount = learners.filter((l) => l.status === "absent").length;

  const handleStatusChange = (id: string, status: Status) => {
    setLearners((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
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
            learner={learner}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>

      <SaveButton onSave={handleSave} saving={saving} saved={saved} />
    </>
  );
}