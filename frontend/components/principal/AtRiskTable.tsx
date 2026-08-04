// frontend/components/principal/AtRiskTable.tsx

import { AtRiskLearner } from "@/types/principal";

const riskBadge = {
  high: "bg-red-50 text-red-700",
  medium: "bg-amber-50 text-amber-700",
};

const riskLabel = {
  high: "High Risk",
  medium: "Medium Risk",
};

export default function AtRiskTable({ data }: { data: AtRiskLearner[] }) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-8">
        No learners in this category.
      </p>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Learner</th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Grade</th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Reason</th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Absence</th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Term Avg</th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Risk</th>
        </tr>
      </thead>
      <tbody>
        {data.map((l) => (
          <tr key={l.id} className="border-b border-gray-50 last:border-0">
            <td className="py-2.5 font-medium text-gray-900">{l.name}</td>
            <td className="py-2.5 text-gray-500">{l.grade}</td>
            <td className="py-2.5 text-gray-500 italic max-w-[220px]">{l.flaggedReason}</td>
            <td className="py-2.5 text-right text-gray-700 tabular-nums">
              {l.daysAbsentRecent}/{l.daysWindow}
            </td>
            <td className="py-2.5 text-right text-gray-700 tabular-nums">{l.termAverage}%</td>
            <td className="py-2.5 text-right">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskBadge[l.riskLevel]}`}>
                {riskLabel[l.riskLevel]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
