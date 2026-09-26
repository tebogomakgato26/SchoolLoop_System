// frontend/app/principal/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, UserX, Clock, GraduationCap } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import KpiCard from "@/components/principal/KpiCard";
import AttendanceChart from "@/components/principal/AttendanceChart";
import ClassAttendanceTable from "@/components/principal/ClassAttendanceTable";
import AtRiskPanel from "@/components/principal/AtRiskPanel";
import { authFetch } from "@/lib/auth";
import {
  AttendanceSummary,
  ClassAttendance,
  AtRiskLearner,
} from "@/types/principal";

const emptySummary: AttendanceSummary = {
  present: 0,
  absent: 0,
  late: 0,
  total: 0,
  isLive: true,
};

export default function PrincipalDashboardPage() {
  const [summary, setSummary] = useState<AttendanceSummary>(emptySummary);
  const [classes, setClasses] = useState<ClassAttendance[]>([]);
  const [atRisk, setAtRisk] = useState<AtRiskLearner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, classesRes, atRiskRes] = await Promise.all([
          authFetch("/principal/attendance/summary"),
          authFetch("/principal/attendance/by-class"),
          authFetch("/principal/at-risk"),
        ]);

        if (!summaryRes.ok || !classesRes.ok || !atRiskRes.ok) {
          throw new Error("Backend responded with an error.");
        }

        setSummary(await summaryRes.json());
        setClasses(await classesRes.json());
        setAtRisk(await atRiskRes.json());
        setError(null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Couldn't load live data. Is the backend running on port 5000?");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <PageHeader
        title="School Dashboard"
        subtitle="Soshanguve High - Monday, 28 April"
        isLive={summary.isLive}
      />

      <div className="px-8 py-6">
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400">Loading attendance data...</p>
        ) : (
          <>
            <div className="flex gap-4 mb-6">
              <KpiCard label="Present" value={summary.present} icon={Users} accent="text-emerald-600" accentBg="bg-emerald-50" />
              <KpiCard label="Absent" value={summary.absent} icon={UserX} accent="text-red-600" accentBg="bg-red-50" />
              <KpiCard label="Late" value={summary.late} icon={Clock} accent="text-amber-600" accentBg="bg-amber-50" />
              <KpiCard label="Total Learners" value={summary.total} icon={GraduationCap} accent="text-indigo-600" accentBg="bg-indigo-50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-4">Attendance by Class</h2>
                {classes.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No classes found yet. Run <code className="bg-gray-100 px-1 rounded">npm run seed</code> in your backend folder to generate sample data.
                  </p>
                ) : (
                  <>
                    <AttendanceChart data={classes} />
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <ClassAttendanceTable data={classes} />
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <AtRiskPanel learners={atRisk} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
