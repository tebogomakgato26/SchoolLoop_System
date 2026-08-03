// frontend/app/principal/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, UserX, Clock, GraduationCap } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import KpiCard from "@/components/principal/KpiCard";
import AttendanceChart from "@/components/principal/AttendanceChart";
import ClassAttendanceTable from "@/components/principal/ClassAttendanceTable";
import AtRiskPanel from "@/components/principal/AtRiskPanel";
import {
  AttendanceSummary,
  ClassAttendance,
  AtRiskLearner,
} from "@/types/principal";

// --- MOCK DATA ---
// TEMPORARY: placeholder data until the Express + MySQL endpoints exist.
// Delete these arrays and uncomment the fetch() calls in useEffect once ready.

const mockSummary: AttendanceSummary = {
  present: 612,
  absent: 47,
  late: 12,
  total: 671,
  isLive: true,
};

const mockClasses: ClassAttendance[] = [
  { id: "1", className: "Grade 9A - Mathematics", teacherName: "Ms Dlamini", present: 30, absent: 2, late: 0, percentage: 94 },
  { id: "2", className: "Grade 10B - English", teacherName: "Mr Nkosi", present: 27, absent: 8, late: 1, percentage: 76 },
  { id: "3", className: "Grade 10B - Physical Sci", teacherName: "Ms Sithole", present: 20, absent: 13, late: 0, percentage: 61 },
  { id: "4", className: "Grade 11A - Life Sciences", teacherName: "Mr Khumalo", present: 32, absent: 1, late: 2, percentage: 96 },
  { id: "5", className: "Grade 8C - Geography", teacherName: "Ms Mokoena", present: 24, absent: 9, late: 0, percentage: 73 },
];

const mockAtRisk: AtRiskLearner[] = [
  { id: "1", name: "Siphamandla Nkosi", grade: "Grade 10B", riskLevel: "high", daysAbsentRecent: 8, daysWindow: 10, termAverage: 34, flaggedReason: "Chronic absence and declining marks" },
  { id: "2", name: "Nomsa Vilakazi", grade: "Grade 9A", riskLevel: "medium", daysAbsentRecent: 4, daysWindow: 10, termAverage: 41, flaggedReason: "Rising absence trend" },
  { id: "3", name: "Katlego Molefe", grade: "Grade 11A", riskLevel: "high", daysAbsentRecent: 9, daysWindow: 10, termAverage: 28, flaggedReason: "Two disciplinary incidents this term" },
];

// --- PAGE ---

export default function PrincipalDashboardPage() {
  const [summary, setSummary] = useState<AttendanceSummary>(mockSummary);
  const [classes, setClasses] = useState<ClassAttendance[]>(mockClasses);
  const [atRisk, setAtRisk] = useState<AtRiskLearner[]>(mockAtRisk);

  useEffect(() => {
    // Uncomment once backend endpoints exist, and delete the mock data above:
    //
    // const fetchData = async () => {
    //   const [summaryRes, classesRes, atRiskRes] = await Promise.all([
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/attendance/summary`),
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/attendance/by-class`),
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/at-risk`),
    //   ]);
    //   setSummary(await summaryRes.json());
    //   setClasses(await classesRes.json());
    //   setAtRisk(await atRiskRes.json());
    // };
    // fetchData();
    // const interval = setInterval(fetchData, 20000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <PageHeader
        title="School Dashboard"
        subtitle="Soshanguve High · Monday, 28 April"
        isLive={summary.isLive}
      />

      <div className="px-8 py-6">
        {/* KPI row */}
        <div className="flex gap-4 mb-6">
          <KpiCard label="Present" value={summary.present} icon={Users} accent="text-emerald-600" accentBg="bg-emerald-50" delta={{ value: 2, direction: "up" }} />
          <KpiCard label="Absent" value={summary.absent} icon={UserX} accent="text-red-600" accentBg="bg-red-50" delta={{ value: 1, direction: "down" }} />
          <KpiCard label="Late" value={summary.late} icon={Clock} accent="text-amber-600" accentBg="bg-amber-50" />
          <KpiCard label="Total Learners" value={summary.total} icon={GraduationCap} accent="text-indigo-600" accentBg="bg-indigo-50" />
        </div>

        {/* Main grid: chart + table (wide) / at-risk panel (narrow) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">
              Attendance by Class
            </h2>
            <AttendanceChart data={classes} />
            <div className="mt-5 pt-5 border-t border-gray-100">
              <ClassAttendanceTable data={classes} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <AtRiskPanel learners={atRisk} />
          </div>
        </div>
      </div>
    </div>
  );
}
