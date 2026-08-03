// frontend/app/principal/alerts/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, AlertCircle, Users } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import KpiCard from "@/components/principal/KpiCard";
import AtRiskTable from "@/components/principal/AtRiskTable";
import { AtRiskLearner, RiskLevel } from "@/types/principal";

// TEMPORARY MOCK DATA — replace with fetch() once backend exists
const mockAtRisk: AtRiskLearner[] = [
  {
    id: "1",
    name: "Siphamandla Nkosi",
    grade: "Grade 10B",
    riskLevel: "high",
    daysAbsentRecent: 8,
    daysWindow: 10,
    termAverage: 34,
    flaggedReason: "Chronic absence and declining marks",
  },
  {
    id: "2",
    name: "Nomsa Vilakazi",
    grade: "Grade 9A",
    riskLevel: "medium",
    daysAbsentRecent: 4,
    daysWindow: 10,
    termAverage: 41,
    flaggedReason: "Rising absence trend",
  },
  {
    id: "3",
    name: "Katlego Molefe",
    grade: "Grade 11A",
    riskLevel: "high",
    daysAbsentRecent: 9,
    daysWindow: 10,
    termAverage: 28,
    flaggedReason: "Two disciplinary incidents this term",
  },
];

type FilterOption = "all" | RiskLevel;

export default function AlertsPage() {
  const [learners, setLearners] = useState<AtRiskLearner[]>(mockAtRisk);
  const [filter, setFilter] = useState<FilterOption>("all");

  useEffect(() => {
    // Uncomment once backend is ready, and delete mockAtRisk above:
    //
    // const fetchData = async () => {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/at-risk`);
    //   setLearners(await res.json());
    // };
    // fetchData();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? learners : learners.filter((l) => l.riskLevel === filter)),
    [learners, filter]
  );

  const highCount = learners.filter((l) => l.riskLevel === "high").length;
  const mediumCount = learners.filter((l) => l.riskLevel === "medium").length;

  const filters: { value: FilterOption; label: string }[] = [
    { value: "all", label: `All (${learners.length})` },
    { value: "high", label: `High Risk (${highCount})` },
    { value: "medium", label: `Medium Risk (${mediumCount})` },
  ];

  return (
    <div>
      <PageHeader
        title="At-Risk Alerts"
        subtitle="Learners flagged by chronic absence, falling marks, or disciplinary trends"
      />

      <div className="px-8 py-6">
        {/* KPI row */}
        <div className="flex gap-4 mb-6">
          <KpiCard label="Total Flagged" value={learners.length} icon={Users} accent="text-indigo-600" accentBg="bg-indigo-50" />
          <KpiCard label="High Risk" value={highCount} icon={AlertTriangle} accent="text-red-600" accentBg="bg-red-50" />
          <KpiCard label="Medium Risk" value={mediumCount} icon={AlertCircle} accent="text-amber-600" accentBg="bg-amber-50" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-4">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  filter === f.value
                    ? "bg-indigo-950 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <AtRiskTable data={filtered} />
        </div>
      </div>
    </div>
  );
}
