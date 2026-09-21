"use client";

import { useState } from "react";
import { useLearners } from "@/lib/context/LearnerContext";
import MarkRow from "@/components/marks/MarkRow";
import SaveMarksButton from "@/components/marks/SaveMarksButton";

export default function MarksRegister() {
  const { learners, setScore } = useLearners();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleScoreChange = (id: string, score: number) => {
    setScore(id, score);
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
        {learners.map((learner) => (
          <MarkRow
            key={learner.id}
            mark={{ id: learner.id, learnerName: learner.name, subject: "Mathematics", score: learner.averageScore }}
            onScoreChange={handleScoreChange}
          />
        ))}
      </ul>

      <SaveMarksButton onSave={handleSave} saving={saving} saved={saved} />
    </>
  );
}