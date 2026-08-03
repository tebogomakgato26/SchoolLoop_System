// frontend/app/principal/performance/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Target, TrendingDown } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import KpiCard from "@/components/principal/KpiCard";
import SubjectChart from "@/components/principal/SubjectChart";
import SubjectPerformanceTable from "@/components/principal/SubjectPerformanceTable";
import TrendingPanel from "@/components/principal/TrendingPanel";
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
      <PageHeader
        title="Performance"
        subtitle="Subject and class performance trends"
      />

      <div className="px-8 py-6">
        {/* KPI row */}
        <div className="flex gap-4 mb-6">
          <KpiCard label="School Average" value={schoolAverage} icon={Target} accent="text-indigo-600" accentBg="bg-indigo-50" />
          <KpiCard label="Declining Subjects" value={decliningCount} icon={TrendingDown} accent="text-red-600" accentBg="bg-red-50" />
        </div>

        {/* Main grid: chart + table (wide) / trending panel (narrow) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">By Subject &amp; Class</h2>
            <SubjectChart data={subjects} />
            <div className="mt-5 pt-5 border-t border-gray-100">
              <SubjectPerformanceTable data={subjects} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <TrendingPanel data={subjects} />
          </div>
        </div>
      </div>
    </div>
  );
}
