"use client";

import { useEffect, useState } from "react";
import { useLearners } from "@/lib/context/LearnerContext";
import { api } from "@/lib/api";
import { Assessment, MarkRosterRow } from "@/types/marks";
import MarkRow from "@/components/marks/MarkRow";
import SaveMarksButton from "@/components/marks/SaveMarksButton";

const today = () => new Date().toISOString().slice(0, 10);
const msg = (e: unknown, fallback: string) => (e instanceof Error ? e.message : fallback);

export default function MarksRegister() {
  const { selectedClassId, loading: classLoading, reload } = useLearners();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [assessmentId, setAssessmentId] = useState("");
  const [roster, setRoster] = useState<MarkRosterRow[]>([]);
  const [totalMarks, setTotalMarks] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [newTotal, setNewTotal] = useState("100");
  const [newDate, setNewDate] = useState(today());

  // Load the assessments for the selected class
  useEffect(() => {
    if (!selectedClassId) return;
    setLoading(true);
    setError(null);
    api
      .getAssessments(selectedClassId)
      .then((list) => {
        setAssessments(list);
        setAssessmentId(list[0]?.id ?? "");
      })
      .catch((e) => setError(msg(e, "Could not load assessments")))
      .finally(() => setLoading(false));
  }, [selectedClassId]);

  // Load the roster for the selected assessment
  useEffect(() => {
    if (!assessmentId) {
      setRoster([]);
      return;
    }
    setSaved(false);
    api
      .getMarksRoster(assessmentId)
      .then((d) => {
        setRoster(d.roster);
        setTotalMarks(d.totalMarks);
      })
      .catch((e) => setError(msg(e, "Could not load marks")));
  }, [assessmentId]);

  const handleScoreChange = (id: string, score: number | null) => {
    setRoster((prev) => prev.map((r) => (r.learnerId === id ? { ...r, score } : r)));
    setSaved(false);
  };

  const handleSave = async () => {
    const records = roster
      .filter((r) => r.score !== null)
      .map((r) => ({ learnerId: r.learnerId, score: r.score as number }));

    if (records.length === 0) {
      setSaveError("Enter at least one mark before saving.");
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      await api.submitMarks(assessmentId, records);
      await reload(); // term averages and risk levels have changed
      setSaved(true);
    } catch (e) {
      setSaveError(msg(e, "Could not save marks"));
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async () => {
    if (!selectedClassId) return;
    const total = Number(newTotal);
    if (!title.trim() || !total || total <= 0) {
      setSaveError("Enter a title and a total greater than 0.");
      return;
    }
    try {
      setSaveError(null);
      const created = await api.createAssessment({
        classId: selectedClassId,
        title: title.trim(),
        totalMarks: total,
        date: newDate,
      });
      setAssessments((prev) => [created, ...prev]);
      setAssessmentId(created.id);
      setShowForm(false);
      setTitle("");
    } catch (e) {
      setSaveError(msg(e, "Could not create assessment"));
    }
  };

  if (classLoading || loading) {
    return <p className="py-10 text-center text-sm text-slate-400">Loading...</p>;
  }
  if (error) return <p className="py-10 text-center text-sm text-red-600">{error}</p>;
  if (!selectedClassId) {
    return <p className="py-10 text-center text-sm text-slate-400">No class assigned.</p>;
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        {assessments.length > 0 && (
          <select
            value={assessmentId}
            onChange={(e) => setAssessmentId(e.target.value)}
            className="h-9 flex-1 rounded-lg border border-slate-200 px-2 text-sm text-slate-800"
          >
            {assessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.date})
              </option>
            ))}
          </select>
        )}
        <button
          onClick={() => setShowForm((v) => !v)}
          className="h-9 rounded-lg border border-teal-800 px-3 text-xs font-semibold text-teal-800"
        >
          {showForm ? "Cancel" : "New assessment"}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 grid grid-cols-[1fr_5rem_8rem_auto] gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Term 4 Test 1"
            className="h-9 rounded-lg border border-slate-200 px-2 text-sm"
          />
          <input
            type="number"
            value={newTotal}
            onChange={(e) => setNewTotal(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 px-2 text-sm"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 px-2 text-sm"
          />
          <button
            onClick={handleCreate}
            className="h-9 rounded-lg bg-teal-800 px-3 text-xs font-semibold text-white"
          >
            Create
          </button>
        </div>
      )}

      {assessments.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-400">
          No assessments yet. Create one to start entering marks.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-1 pb-2 text-xs font-semibold text-slate-400">
            <span>LEARNERS</span>
            <span className="w-16 text-center">SCORE</span>
            <span className="w-10"></span>
          </div>

          <ul className="divide-y divide-slate-100">
            {roster.map((r) => (
              <MarkRow
                key={r.learnerId}
                learnerId={r.learnerId}
                learnerName={r.fullName}
                score={r.score}
                total={totalMarks}
                onScoreChange={handleScoreChange}
              />
            ))}
          </ul>

          {saveError && <p className="mt-4 text-sm text-red-600">{saveError}</p>}

          <SaveMarksButton onSave={handleSave} saving={saving} saved={saved} />
        </>
      )}
    </>
  );
}