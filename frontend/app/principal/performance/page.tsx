// frontend/app/principal/performance/page.tsx
"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingDown } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import KpiCard from "@/components/principal/KpiCard";
import SubjectChart from "@/components/principal/SubjectChart";
import SubjectPerformanceTable from "@/components/principal/SubjectPerformanceTable";
import TrendingPanel from "@/components/principal/TrendingPanel";
import { SubjectPerformance } from "@/types/principal";

export default function PerformancePage() {
  const [subjects, setSubjects] = useState<SubjectPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/performance`);
        if (!res.ok) throw new Error("Backend responded with an error.");
        setSubjects(await res.json());
        setError(null);
      } catch (err) {
        console.error("Performance fetch error:", err);
        setError("Couldn't load performance data. Is the backend running on port 5000?");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const schoolAverage =
    subjects.length > 0
      ? Math.round(subjects.reduce((sum, s) => sum + s.averageMark, 0) / subjects.length)
      : 0;
  const decliningCount = subjects.filter((s) => s.trend === "down").length;

  return (
    <div>
      <PageHeader title="Performance" subtitle="Subject and class performance trends" />

      <div className="px-8 py-6">
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400">Loading performance data...</p>
        ) : subjects.length === 0 ? (
          <p className="text-sm text-gray-400">
            No assessments with marks entered yet. Once a teacher creates an
            assessment and submits scores, subjects will show up here.
          </p>
        ) : (
          <>
            {/* KPI row */}
            <div className="flex gap-4 mb-6">
              <KpiCard
                label="School Average"
                value={schoolAverage}
                icon={BarChart3}
                accent="text-indigo-600"
                accentBg="bg-indigo-50"
              />
              <KpiCard
                label="Declining Subjects"
                value={decliningCount}
                icon={TrendingDown}
                accent="text-red-600"
                accentBg="bg-red-50"
              />
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
          </>
        )}
      </div>
    </div>
  );
}
