// frontend/components/principal/AttendanceChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ClassAttendance } from "@/types/principal";

function barColor(pct: number) {
  if (pct >= 85) return "#10b981"; // emerald-500
  if (pct >= 70) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
}

export default function AttendanceChart({ data }: { data: ClassAttendance[] }) {
  const chartData = data.map((c) => ({
    name: c.className.replace(" - ", "\n"),
    percentage: c.percentage,
  }));

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={{ stroke: "#E2E8F0" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#64748B" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            cursor={{ fill: "#F8FAFC" }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #E2E8F0",
            }}
            formatter={(value: number) => [`${value}%`, "Attendance"]}
          />
          <Bar dataKey="percentage" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={barColor(entry.percentage)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
