// frontend/components/principal/AtRiskPanel.tsx

import { AlertTriangle } from "lucide-react";
import { AtRiskLearner } from "@/types/principal";

const riskDot: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
};

export default function AtRiskPanel({ learners }: { learners: AtRiskLearner[] }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-red-500" />
        <h2 className="text-sm font-bold text-gray-900">At-Risk Learners</h2>
      </div>

      {learners.length === 0 ? (
        <p className="text-sm text-gray-400 flex-1">
          No learners currently flagged.
        </p>
      ) : (
        <div className="flex flex-col gap-3 flex-1">
          {learners.map((learner) => (
            <div key={learner.id} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={"w-1.5 h-1.5 rounded-full " + (riskDot[learner.riskLevel] || "bg-gray-400")} />
                <span className="font-semibold text-gray-900 text-sm">{learner.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{learner.grade}</span>
              </div>
              <p className="text-xs text-gray-500 pl-3.5">
                {learner.daysAbsentRecent}/{learner.daysWindow} days absent · {learner.termAverage}% avg
              </p>
              <p className="text-xs text-gray-400 pl-3.5 italic mt-0.5">
                {learner.flaggedReason}
              </p>
            </div>
          ))}
        </div>
      )}

      <a
        href="/principal/alerts"
        className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 mt-4 pt-3 border-t border-gray-100 block"
      >
        View all alerts →
      </a>
    </div>
  );
}
