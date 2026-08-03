"use client";

import { useState } from "react";
import { Mark } from "@/types/marks";
import MarkRow from "@/components/marks/MarkRow";
import SaveMarksButton from "@/components/marks/SaveMarksButton";

const initialMarks: Mark[] = [
  { id: "1", learnerName: "Amanhle Dube", subject: "Mathematics", score: 82 },
  { id: "2", learnerName: "Sipho Ndlovu", subject: "Mathematics", score: 67 },
  { id: "3", learnerName: "Lerato Khumalo", subject: "Mathematics", score: 91 },
  { id: "4", learnerName: "Nandi Cele", subject: "Mathematics", score: 74 },
];

export default function MarksRegister() {
  const [marks, setMarks] = useState<Mark[]>(initialMarks);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleScoreChange = (id: string, score: number) => {
    setMarks((prev) =>
      prev.map((m) => (m.id === id ? { ...m, score } : m))
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
      <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-1 pb-2 text-xs font-semibold text-slate-400">
        <span>LEARNERS</span>
        <span className="w-14 text-center">SCORE</span>
        <span className="w-4"></span>
      </div>

      <ul className="divide-y divide-slate-100">
        {marks.map((mark) => (
          <MarkRow key={mark.id} mark={mark} onScoreChange={handleScoreChange} />
        ))}
      </ul>

      <SaveMarksButton onSave={handleSave} saving={saving} saved={saved} />
    </>
  );
}