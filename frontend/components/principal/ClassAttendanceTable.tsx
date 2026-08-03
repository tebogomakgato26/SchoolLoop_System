// frontend/components/principal/ClassAttendanceTable.tsx

import { ClassAttendance } from "@/types/principal";

function badgeStyle(pct: number) {
  if (pct >= 85) return "bg-emerald-50 text-emerald-700";
  if (pct >= 70) return "bg-amber-50 text-amber-700";
  return "bg-red-50 text-red-700";
}

export default function ClassAttendanceTable({ data }: { data: ClassAttendance[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Class
          </th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Teacher
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Present
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Absent
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Rate
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((c) => (
          <tr key={c.id} className="border-b border-gray-50 last:border-0">
            <td className="py-2.5 font-medium text-gray-900">{c.className}</td>
            <td className="py-2.5 text-gray-500">{c.teacherName}</td>
            <td className="py-2.5 text-right text-gray-700 tabular-nums">{c.present}</td>
            <td className="py-2.5 text-right text-gray-700 tabular-nums">{c.absent}</td>
            <td className="py-2.5 text-right">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeStyle(
                  c.percentage
                )}`}
              >
                {c.percentage}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
