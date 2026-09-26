// frontend/app/principal/register/page.tsx
"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/principal/PageHeader";
import ParentSearchPanel from "@/components/principal/ParentSearchPanel";
import { authFetch } from "@/lib/auth";
import {
  ParentRecord,
  NewParentInput,
  NewLearnerInput,
  RegisterLearnerPayload,
} from "@/types/principal";

const emptyLearner: NewLearnerInput = {
  fullName: "",
  dateOfBirth: "",
  gender: "male",
  grade: "",
  className: "",
  admissionNumber: "",
};

export default function RegisterLearnerPage() {
  const [selectedParent, setSelectedParent] = useState<ParentRecord | null>(null);
  const [newParent, setNewParent] = useState<NewParentInput | null>(null);
  const [learner, setLearner] = useState<NewLearnerInput>(emptyLearner);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateLearner<K extends keyof NewLearnerInput>(key: K, value: NewLearnerInput[K]) {
    setLearner((prev) => ({ ...prev, [key]: value }));
  }

  const canSubmit =
    (selectedParent || (newParent && newParent.fullName && newParent.idNumber)) &&
    learner.fullName &&
    learner.dateOfBirth &&
    learner.grade &&
    learner.admissionNumber;

  async function handleSubmit() {
    setError(null);
    setSuccess(null);

    const payload: RegisterLearnerPayload = {
      learner,
      ...(selectedParent ? { parentId: selectedParent.id } : {}),
      ...(newParent ? { newParent } : {}),
    };

    setSubmitting(true);
    try {
      const res = await authFetch("/principal/learners/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess(`${learner.fullName} was registered successfully.`);
      setLearner(emptyLearner);
      setSelectedParent(null);
      setNewParent(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Register Learner"
        subtitle="Link a new or existing learner to a parent/guardian account"
      />

      <div className="px-8 py-6 max-w-2xl">
        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3 mb-6">
            <CheckCircle2 size={16} />
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">Parent / Guardian</h2>
          <p className="text-xs text-gray-500 mb-4">
            Search first — if this parent already has a learner registered, link this
            learner to the same account instead of creating a duplicate.
          </p>
          <ParentSearchPanel
            selectedParent={selectedParent}
            onSelectParent={setSelectedParent}
            newParent={newParent}
            onNewParentChange={setNewParent}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Learner Details</h2>

          <div className="grid grid-cols-2 gap-3">
            <input
              className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Full name"
              value={learner.fullName}
              onChange={(e) => updateLearner("fullName", e.target.value)}
            />
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date of birth</label>
              <input
                type="date"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={learner.dateOfBirth}
                onChange={(e) => updateLearner("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Gender</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={learner.gender}
                onChange={(e) => updateLearner("gender", e.target.value as "male" | "female")}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Grade (e.g. Grade 9)"
              value={learner.grade}
              onChange={(e) => updateLearner("grade", e.target.value)}
            />
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Class (e.g. 9A)"
              value={learner.className}
              onChange={(e) => updateLearner("className", e.target.value)}
            />
            <input
              className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Admission number"
              value={learner.admissionNumber}
              onChange={(e) => updateLearner("admissionNumber", e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="bg-indigo-950 text-white text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-900 transition-colors"
        >
          {submitting ? "Registering..." : "Register Learner"}
        </button>
      </div>
    </div>
  );
}
