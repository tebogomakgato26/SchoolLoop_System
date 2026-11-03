"use client";

import { useState } from "react";
import { isAtRisk, getRiskReason } from "@/types/teacher";
import { useLearners } from "@/lib/context/LearnerContext";

export default function AlertsList() {
  const { learners, flaggedIds, flagLearner, loading, error } = useLearners();
  const [pending, setPending] = useState<string | null>(null);
  const [flagError, setFlagError] = useState<string | null>(null);

  if (loading) return <p className="py-10 text-center text-sm text-slate-400">Loading...</p>;
  if (error) return <p className="py-10 text-center text-sm text-red-600">{error}</p>;

  const alerts = learners.filter(isAtRisk);

  const handleFlag = async (id: string, reasons: string[]) => {
    setPending(id);
    setFlagError(null);
    try {
      await flagLearner(id, reasons.join("; "));
    } catch (e) {
      setFlagError(e instanceof Error ? e.message : "Could not flag learner");
    } finally {
      setPending(null);
    }
  };

  if (alerts.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-400">No alerts right now.</p>;
  }

  return (
    <>
      {flagError && <p className="mb-3 text-sm text-red-600">{flagError}</p>}
      <ul className="divide-y divide-slate-100">
        {alerts.map((learner) => {
          const reasons = getRiskReason(learner);
          const isFlagged = flaggedIds.includes(learner.id);
          const chip =
            learner.riskLevel === "high"
              ? "bg-red-50 text-red-600"
              : "bg-amber-50 text-amber-700";

          return (
            <li key={learner.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">{learner.name}</p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {reasons.map((reason, i) => (
                    <li key={i} className={`rounded-full px-3 py-1 text-xs font-medium ${chip}`}>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleFlag(learner.id, reasons)}
                disabled={isFlagged || pending === learner.id}
                className="flex-shrink-0 rounded-lg bg-teal-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-900 disabled:bg-slate-200 disabled:text-slate-400"
              >
                {isFlagged ? "Flagged to principal" : pending === learner.id ? "Flagging..." : "Flag to principal"}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}