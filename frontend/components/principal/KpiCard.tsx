// frontend/components/principal/KpiCard.tsx

import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accent: string; // tailwind text color class for the icon, e.g. "text-emerald-600"
  accentBg: string; // tailwind bg color class for the icon chip, e.g. "bg-emerald-50"
  delta?: { value: number; direction: "up" | "down" };
}

export default function KpiCard({
  label,
  value,
  icon: Icon,
  accent,
  accentBg,
  delta,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex-1 min-w-[140px]">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accentBg}`}>
          <Icon size={16} className={accent} strokeWidth={2.25} />
        </div>
        {delta && (
          <span
            className={`text-[11px] font-semibold ${
              delta.direction === "up" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {delta.direction === "up" ? "▲" : "▼"} {delta.value}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 tabular-nums leading-none">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1.5">{label}</p>
    </div>
  );
}
