// frontend/components/principal/TrendingPanel.tsx

import { TrendingUp, TrendingDown } from "lucide-react";
import { SubjectPerformance } from "@/types/principal";

export default function TrendingPanel({ data }: { data: SubjectPerformance[] }) {
  const improving = [...data]
    .filter((s) => s.trend === "up")
    .sort((a, b) => b.trendValue - a.trendValue);

  const declining = [...data]
    .filter((s) => s.trend === "down")
    .sort((a, b) => b.trendValue - a.trendValue);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-emerald-600" />
          <h2 className="text-sm font-bold text-gray-900">Improving</h2>
        </div>
        {improving.length === 0 ? (
          <p className="text-xs text-gray-400">No subjects trending up.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {improving.map((s) => (
              <div key={s.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.subjectName}</p>
                  <p className="text-xs text-gray-400">{s.grade}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  ▲ {s.trendValue}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown size={16} className="text-red-600" />
          <h2 className="text-sm font-bold text-gray-900">Declining</h2>
        </div>
        {declining.length === 0 ? (
          <p className="text-xs text-gray-400">No subjects trending down.</p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {declining.map((s) => (
              <div key={s.id} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.subjectName}</p>
                  <p className="text-xs text-gray-400">{s.grade}</p>
                </div>
                <span className="text-xs font-semibold text-red-600">
                  ▼ {s.trendValue}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
