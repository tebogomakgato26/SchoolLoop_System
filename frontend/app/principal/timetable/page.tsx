// frontend/app/principal/timetable/page.tsx
"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/principal/PageHeader";
import ExamTimetableTable from "@/components/principal/ExamTimetableTable";
import { ExamTimetableEntry } from "@/types/principal";

// TEMPORARY MOCK DATA — replace with fetch() once backend exists
const mockTimetable: ExamTimetableEntry[] = [
  { id: "1", subject: "Mathematics", grade: "Grade 9A", date: "04 Aug 2026", time: "09:00 - 11:00", venue: "Hall A", status: "published" },
  { id: "2", subject: "English Home Language", grade: "Grade 10B", date: "05 Aug 2026", time: "09:00 - 11:30", venue: "Hall A", status: "published" },
  { id: "3", subject: "Physical Sciences", grade: "Grade 11A", date: "06 Aug 2026", time: "13:00 - 15:00", venue: "Hall B", status: "draft" },
  { id: "4", subject: "Life Sciences", grade: "Grade 11B", date: "07 Aug 2026", time: "09:00 - 11:00", venue: "Hall B", status: "draft" },
];

export default function TimetablePage() {
  const [exams, setExams] = useState<ExamTimetableEntry[]>(mockTimetable);

  useEffect(() => {
    // Uncomment once backend is ready, and delete mockTimetable above:
    //
    // const fetchData = async () => {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/principal/timetable`);
    //   setExams(await res.json());
    // };
    // fetchData();
  }, []);

  const draftCount = exams.filter((e) => e.status === "draft").length;

  // Placeholder for the "publish all drafts" action — wire to a real
  // POST /api/principal/timetable/publish endpoint once backend exists.
  const handlePublishAll = () => {
    setExams((prev) => prev.map((e) => ({ ...e, status: "published" as const })));
  };

  return (
    <div>
      <PageHeader
        title="Exam Timetable"
        subtitle="Manage and publish upcoming exams"
        action={
          draftCount > 0 ? (
            <button
              onClick={handlePublishAll}
              className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Publish {draftCount} draft{draftCount > 1 ? "s" : ""}
            </button>
          ) : undefined
        }
      />

      <div className="px-8 py-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <ExamTimetableTable data={exams} />
        </div>
      </div>
    </div>
  );
}
