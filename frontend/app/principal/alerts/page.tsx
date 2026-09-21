// frontend/app/principal/alerts/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, AlertCircle, Users } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import KpiCard from "@/components/principal/KpiCard";
import AtRiskTable from "@/components/principal/AtRiskTable";
import { AtRiskLearner, RiskLevel } from "@/types/principal";

type FilterOption = "all" | RiskLevel;

export default function AlertsPage() {
  const [learners, setLearners] = useState<AtRiskLearner[]>([]);
  const [filter, setFilter] = useState<FilterOption>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/principal/at-risk");
        if (!res.ok) throw new Error("Backend responded with an error.");
        setLearners(await res.json());
        setError(null);
      } catch (err) {
        console.error("At-risk fetch error:", err);
        setError("Couldn't load at-risk data. Is the backend running on port 5000?");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? learners : learners.filter((l) => l.riskLevel === filter)),
    [learners, filter]
  );

  const highCount = learners.filter((l) => l.riskLevel === "high").length;
  const mediumCount = learners.filter((l) => l.riskLevel === "medium").length;

  const filters: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All (" + learners.length + ")" },
    { value: "high", label: "High Risk (" + highCount + ")" },
    { value: "medium", label: "Medium Risk (" + mediumCount + ")" },
  ];

  return (
    <div>
      <PageHeader
        title="At-Risk Alerts"
        subtitle="Learners flagged by chronic absence, falling marks, or disciplinary trends"
      />

      <div className="px-8 py-6">
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400">Loading at-risk data...</p>
        ) : (
          <>
            <div className="flex gap-4 mb-6">
              <KpiCard label="Total Flagged" value={learners.length} icon={Users} accent="text-indigo-600" accentBg="bg-indigo-50" />
              <KpiCard label="High Risk" value={highCount} icon={AlertTriangle} accent="text-red-600" accentBg="bg-red-50" />
              <KpiCard label="Medium Risk" value={mediumCount} icon={AlertCircle} accent="text-amber-600" accentBg="bg-amber-50" />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex gap-2 mb-4">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={
                      "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors " +
                      (filter === f.value
                        ? "bg-indigo-950 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100")
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  No learners in this category.
                </p>
              ) : (
                <AtRiskTable data={filtered} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
