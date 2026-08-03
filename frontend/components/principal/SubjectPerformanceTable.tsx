// frontend/components/principal/SubjectPerformanceTable.tsx

import { SubjectPerformance } from "@/types/principal";

function badgeStyle(avg: number) {
  if (avg >= 70) return "bg-emerald-50 text-emerald-700";
  if (avg >= 50) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

export default function SubjectPerformanceTable({ data }: { data: SubjectPerformance[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Subject</th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Class</th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Trend</th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">Average</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => {
          const trendIcon = s.trend === "up" ? "▲" : s.trend === "down" ? "▼" : "―";
          const trendColor =
            s.trend === "up" ? "text-emerald-600" : s.trend === "down" ? "text-red-600" : "text-gray-400";
          return (
            <tr key={s.id} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 font-medium text-gray-900">{s.subjectName}</td>
              <td className="py-2.5 text-gray-500">{s.grade}</td>
              <td className={`py-2.5 text-right text-xs font-medium ${trendColor}`}>
                {trendIcon} {s.trendValue}%
              </td>
              <td className="py-2.5 text-right">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeStyle(s.averageMark)}`}>
                  {s.averageMark}%
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
