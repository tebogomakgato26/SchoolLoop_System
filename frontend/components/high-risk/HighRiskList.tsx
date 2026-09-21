"use client";

import { isHighRisk, getRiskReason } from "@/types/teacher";
import { useLearners } from "@/lib/context/LearnerContext";

export default function HighRiskList() {
  const { learners } = useLearners();
  const highRiskLearners = learners.filter(isHighRisk);

  if (highRiskLearners.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-400">
        No high-risk learners right now.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {highRiskLearners.map((learner) => (
        <li key={learner.id} className="py-4">
          <p className="text-sm font-semibold text-slate-800">{learner.name}</p>
          <ul className="mt-1 flex flex-wrap gap-2">
            {getRiskReason(learner).map((reason, i) => (
              <li
                key={i}
                className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
              >
                {reason}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}