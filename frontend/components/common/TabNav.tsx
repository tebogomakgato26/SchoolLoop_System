"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Attendance", href: "/teacher/attendance" },
  { label: "Marks", href: "/teacher/marks" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-slate-200 px-2">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 border-b-2 px-3 py-3 text-center text-sm font-semibold transition ${
              active
                ? "border-teal-800 text-teal-800"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}