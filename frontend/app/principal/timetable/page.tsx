// frontend/app/principal/timetable/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import ExamTimetableTable from "@/components/principal/ExamTimetableTable";
import { authFetch } from "@/lib/auth";
import { ExamTimetableEntry } from "@/types/principal";

const emptyForm = {
  subject: "",
  grade: "",
  date: "",
  time: "",
  venue: "",
};

export default function TimetablePage() {
  const [exams, setExams] = useState<ExamTimetableEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function fetchExams() {
    try {
      const res = await authFetch("/principal/timetable");
      if (!res.ok) throw new Error("Backend responded with an error.");
      setExams(await res.json());
      setError(null);
    } catch (err) {
      console.error("Timetable fetch error:", err);
      setError("Couldn't load timetable data. Is the backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  const draftCount = exams.filter((e) => e.status === "draft").length;

  async function handlePublishAll() {
    setPublishing(true);
    try {
      const res = await authFetch("/principal/timetable/publish", { method: "POST" });
      if (!res.ok) throw new Error("Publish failed.");
      await fetchExams();
    } catch (err) {
      console.error("Publish error:", err);
      setError("Couldn't publish the timetable. Try again.");
    } finally {
      setPublishing(false);
    }
  }

  async function handleAddEntry() {
    if (!form.subject || !form.grade || !form.date || !form.time || !form.venue) return;

    setSaving(true);
    try {
      const res = await authFetch("/principal/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add entry.");
      setForm(emptyForm);
      setShowForm(false);
      await fetchExams();
    } catch (err) {
      console.error("Add entry error:", err);
      setError("Couldn't add that entry. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Exam Timetable"
        subtitle="Manage and publish upcoming exams"
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm((s) => !s)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Plus size={14} />
              Add exam
            </button>
            {draftCount > 0 && (
              <button
                onClick={handlePublishAll}
                disabled={publishing}
                className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-xs font-bold px-4 py-2 rounded-full disabled:opacity-50"
              >
                {publishing ? "Publishing..." : "Publish " + draftCount + " draft" + (draftCount > 1 ? "s" : "")}
              </button>
            )}
          </div>
        }
      />

      <div className="px-8 py-6">
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 max-w-2xl">
            <h2 className="text-sm font-bold text-gray-900 mb-3">New Exam Entry</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Grade (e.g. Grade 9)"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              />
              <input
                type="date"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
              <input
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Time (e.g. 09:00 - 11:00)"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              <input
                className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Venue"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
              />
            </div>
            <button
              onClick={handleAddEntry}
              disabled={saving}
              className="mt-3 bg-indigo-950 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-40"
            >
              {saving ? "Adding..." : "Add to timetable"}
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400">Loading timetable...</p>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-4 md:max-w-3xl">
            {exams.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">
                No exams scheduled yet. Use "Add exam" to create one.
              </p>
            ) : (
              <ExamTimetableTable data={exams} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
