// frontend/app/principal/performance/page.tsx
"use client";

import { useEffect, useState } from "react";
import TabNav from "@/components/principal/TabNav";
import SubjectPerformanceRow from "@/components/principal/SubjectPerformanceRow";
import { SubjectPerformance } from "@/types/principal";

// TEMPORARY MOCK DATA — replace with fetch() once backend exists
const mockPerformance: SubjectPerformance[] = [
  { id: "1", subjectName: "Mathematics", grade: "Grade 9A", averageMark: 68, trend: "up", trendValue: 4 },
  { id: "2", subjectName: "English", grade: "Grade 10B", averageMark: 76, trend: "up", trendValue: 2 },
  { id: "3", subjectName: "Physical Sciences", grade: "Grade 11A", averageMark: 54, trend: "down", trendValue: 6 },
  { id: "4", subjectName: "Life Sciences", grade: "Grade 11B", averageMark: 61, trend: "stable", trendValue: 0 },
  { id: "5", subjectName: "Geography", grade: "Grade 10A", averageMark: 45, trend: "down", trendValue: 9 },
];

export default function PerformancePage() {
  const [subjects, setSubjects] = useState<SubjectPerformance[]>(mockPerformance);

  useEffect(() => {
    // Uncomment once backend is ready, and delete mockPerformance above:
    //
    // const fetchData = async () => {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/performance`);
    //   setSubjects(await res.json());
    // };
    // fetchData();
  }, []);

  const schoolAverage =
    subjects.length > 0
      ? Math.round(subjects.reduce((sum, s) => sum + s.averageMark, 0) / subjects.length)
      : 0;

  const decliningCount = subjects.filter((s) => s.trend === "down").length;

  return (
    <div>
      {/* Header */}
      <div className="bg-indigo-950 text-white px-6 md:px-10 pt-8 pb-6">
        <p className="text-xs text-indigo-300 mb-1">Principal Portal</p>
        <h1 className="text-xl md:text-2xl font-bold">Performance</h1>
        <p className="text-xs text-indigo-300 mt-1">
          Subject and class performance trends
        </p>
      </div>

      {/* Tabs - directly under the header, above the content */}
      <TabNav />

      <div className="px-6 md:px-10 mt-6">
        {/* Summary stats */}
        <div className="bg-white rounded-2xl shadow-sm p-3 flex gap-2 md:max-w-md">
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-4 px-3 flex-1">
            <span className="text-2xl font-bold text-gray-900">{schoolAverage}%</span>
            <span className="text-xs text-gray-500 mt-1">School Average</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-4 px-3 flex-1">
            <span className="text-2xl font-bold text-red-600">{decliningCount}</span>
            <span className="text-xs text-gray-500 mt-1">Declining Subjects</span>
          </div>
        </div>

        {/* Subject list */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">By Subject &amp; Class</h2>
          <div className="bg-white rounded-2xl shadow-sm p-4 md:max-w-3xl">
            {subjects.map((s) => (
              <SubjectPerformanceRow key={s.id} data={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
