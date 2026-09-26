// frontend/components/principal/AtRiskTable.tsx

import { AtRiskLearner } from "@/types/principal";

const badgeStyle: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
};

const badgeLabel: Record<string, string> = {
  high: "High Risk",
  medium: "Medium Risk",
};

export default function AtRiskTable({ data }: { data: AtRiskLearner[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Learner
          </th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Grade
          </th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Reason
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Absence
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Term Avg
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Risk
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((l) => (
          <tr key={l.id} className="border-b border-gray-50 last:border-0">
            <td className="py-2.5 font-medium text-gray-900">{l.name}</td>
            <td className="py-2.5 text-gray-500">{l.grade}</td>
            <td className="py-2.5 text-gray-500 italic">{l.flaggedReason}</td>
            <td className="py-2.5 text-right text-gray-700 tabular-nums">
              {l.daysAbsentRecent}/{l.daysWindow}
            </td>
            <td className="py-2.5 text-right text-gray-700 tabular-nums">{l.termAverage}%</td>
            <td className="py-2.5 text-right">
              <span className={"text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap " + badgeStyle[l.riskLevel]}>
                {badgeLabel[l.riskLevel]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
