"use client";

import { usePathname } from "next/navigation";
import TeacherHearder from "@/components/teacher/TeacherHearder";
import TabNav from "@/components/common/TabNav";
import RequireAuth from "@/components/auth/RequireAuth";
import { LearnerProvider } from "@/lib/context/LearnerContext";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page and home page have their own full-page design, no sidebar
  // (the home page already has its own login check)
  if (pathname === "/teacher" || pathname === "/teacher/home") {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <RequireAuth role="teacher">
      <LearnerProvider>
        <div className="flex min-h-screen bg-slate-100">
          <aside className="flex w-64 flex-shrink-0 flex-col gap-6 bg-teal-800 px-4 py-6">
            <TeacherHearder
              date="Monday, 28 April 2026"
              teacherName="Ms N. Dlamini"
              subject="Mathematics"
              grade="Grade 9A"
            />
            <TabNav />
          </aside>

          <main className="flex-1 px-8 py-8">
            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </LearnerProvider>
    </RequireAuth>
  );
}