"use client";

import { useState } from "react";
import { isHighRisk, getRiskReason } from "@/types/teacher";
import { useLearners } from "@/lib/context/LearnerContext";

export default function AlertsList() {
  const { learners } = useLearners();
  const alerts = learners.filter(isHighRisk);
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});

  const handleFlag = (id: string) => {
    setFlagged((prev) => ({ ...prev, [id]: true }));
  };

  if (alerts.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-slate-400">
        No alerts right now.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {alerts.map((learner) => (
        <li key={learner.id} className="flex items-center justify-between gap-4 py-4">
          <div>
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
          </div>

          <button
            onClick={() => handleFlag(learner.id)}
            disabled={flagged[learner.id]}
            className="flex-shrink-0 rounded-lg bg-teal-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-900 disabled:bg-slate-200 disabled:text-slate-400"
          >
            {flagged[learner.id] ? "Flagged to principal" : "Flag to principal"}
          </button>
        </li>
      ))}
    </ul>
  );
}