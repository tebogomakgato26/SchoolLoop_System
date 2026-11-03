"use client";

import { useEffect, useState } from "react";
import { ExamEntry } from "@/types/timetable";
import { api } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function TimetableGrid() {
  const [entries, setEntries] = useState<ExamEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getExamTimetable()
      .then(setEntries)
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load timetable"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-10 text-center text-sm text-slate-400">Loading timetable...</p>;
  if (error) return <p className="py-10 text-center text-sm text-red-600">{error}</p>;
  if (entries.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-400">No exams have been published yet.</p>;
  }

  // Group by date (the backend already sorts by date)
  const byDate = new Map<string, ExamEntry[]>();
  entries.forEach((e) => byDate.set(e.date, [...(byDate.get(e.date) ?? []), e]));

  return (
    <div className="space-y-6">
      {Array.from(byDate.entries()).map(([date, slots]) => (
        <div key={date}>
          <h2 className="mb-2 text-sm font-semibold text-slate-700">{formatDate(date)}</h2>
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
            {slots.map((slot) => (
              <li
                key={slot.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3"
              >
                <span className="text-sm font-medium text-teal-700">{slot.time}</span>
                <span className="text-sm text-slate-800">{slot.subject}</span>
                <span className="text-xs text-slate-400">
                  {slot.grade} · {slot.venue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}