import TeacherHearder from "@/components/teacher/TeacherHearder";
import TabNav from "@/components/common/TabNav";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto w-full max-w-sm rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        <TeacherHearder
          date="Monday, 28 April 2026"
          teacherName="Ms N. Dlamini"
          subject="Mathematics"
          grade="Grade 9A"
        />
        <TabNav />
        <div className="px-5 py-5">{children}</div>
      </div>
    </main>
  );
}