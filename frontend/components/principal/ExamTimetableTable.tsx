// frontend/components/principal/ExamTimetableTable.tsx

import { ExamTimetableEntry } from "@/types/principal";

export default function ExamTimetableTable({ data }: { data: ExamTimetableEntry[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Subject
          </th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Grade
          </th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Date &amp; Time
          </th>
          <th className="text-left font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Venue
          </th>
          <th className="text-right font-medium text-gray-400 text-xs uppercase tracking-wide pb-2">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((e) => {
          const isPublished = e.status === "published";
          return (
            <tr key={e.id} className="border-b border-gray-50 last:border-0">
              <td className="py-2.5 font-medium text-gray-900">{e.subject}</td>
              <td className="py-2.5 text-gray-500">{e.grade}</td>
              <td className="py-2.5 text-gray-700">
                {e.date} · {e.time}
              </td>
              <td className="py-2.5 text-gray-700">{e.venue}</td>
              <td className="py-2.5 text-right">
                <span
                  className={
                    "text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap " +
                    (isPublished
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500")
                  }
                >
                  {isPublished ? "Published" : "Draft"}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
