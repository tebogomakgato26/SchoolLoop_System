// frontend/components/principal/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  CalendarDays,
  BellRing,
} from "lucide-react";

const navItems = [
  { href: "/principal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/principal/performance", label: "Performance", icon: TrendingUp },
  { href: "/principal/timetable", label: "Timetable", icon: CalendarDays },
  { href: "/principal/alerts", label: "Alerts", icon: BellRing },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#191340] min-h-screen py-6">
      {/* Brand */}
      <div className="px-6 mb-8">
        <p className="text-[11px] font-medium text-indigo-300/70 tracking-wide">
          PRINCIPAL PORTAL
        </p>
        <p className="text-lg font-bold text-white mt-0.5">SchoolLoop</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-indigo-200/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-6 pt-4 border-t border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-400/20 text-white flex items-center justify-center text-xs font-bold">
          N
        </div>
        <div>
          <p className="text-xs font-semibold text-white leading-tight">
            Soshanguve High
          </p>
          <p className="text-[11px] text-indigo-300/60 leading-tight">Principal</p>
        </div>
      </div>
    </aside>
  );
}
