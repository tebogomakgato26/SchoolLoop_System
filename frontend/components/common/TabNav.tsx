"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Attendance", href: "/teacher/attendance" },
  { label: "Marks", href: "/teacher/marks" },
  { label: "Timetable", href: "/teacher/timetable" },
  { label: "Alerts", href: "/teacher/alerts" },
  { label: "High-Risk", href: "/teacher/high-risk" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-teal-700 text-white"
                : "text-teal-100 hover:bg-teal-700/50"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}