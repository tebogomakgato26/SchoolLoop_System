// frontend/components/principal/ParentSearchPanel.tsx
"use client";

import { useState } from "react";
import { Search, UserCheck, UserPlus, X } from "lucide-react";
import { authFetch } from "@/lib/auth";
import { ParentRecord, NewParentInput, Relationship } from "@/types/principal";

interface ParentSearchPanelProps {
  selectedParent: ParentRecord | null;
  onSelectParent: (parent: ParentRecord | null) => void;
  newParent: NewParentInput | null;
  onNewParentChange: (parent: NewParentInput | null) => void;
}

const emptyNewParent: NewParentInput = {
  fullName: "",
  phoneNumber: "",
  email: "",
  idNumber: "",
  relationship: "mother",
};

export default function ParentSearchPanel({
  selectedParent,
  onSelectParent,
  newParent,
  onNewParentChange,
}: ParentSearchPanelProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ParentRecord[]>([]);
  const [searching, setSearching] = useState(false);
  const [mode, setMode] = useState<"search" | "create">("search");

  async function handleSearch(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await authFetch("/principal/parents/search?q=" + encodeURIComponent(value));
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Parent search error:", err);
      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  if (selectedParent) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <UserCheck size={16} className="text-emerald-600" />
            <span className="font-semibold text-gray-900 text-sm">
              {selectedParent.fullName}
            </span>
          </div>
          <button
            onClick={() => onSelectParent(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-1 pl-6">
          {selectedParent.phoneNumber} · {selectedParent.relationship}
        </p>
        {selectedParent.learners && selectedParent.learners.length > 0 && (
          <p className="text-xs text-gray-500 mt-1 pl-6">
            Already linked to: {selectedParent.learners.map((l) => l.fullName).join(", ")}
          </p>
        )}
      </div>
    );
  }

  if (mode === "create") {
    const parent = newParent || emptyNewParent;

    function update<K extends keyof NewParentInput>(key: K, value: NewParentInput[K]) {
      onNewParentChange({ ...parent, [key]: value });
    }

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-900">New Parent Details</span>
          <button
            onClick={() => {
              setMode("search");
              onNewParentChange(null);
            }}
            className="text-xs text-indigo-700 hover:text-indigo-900"
          >
            Search existing instead
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Full name"
            value={parent.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Phone number"
            value={parent.phoneNumber}
            onChange={(e) => update("phoneNumber", e.target.value)}
          />
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="ID number"
            value={parent.idNumber}
            onChange={(e) => update("idNumber", e.target.value)}
          />
          <input
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="Email (optional)"
            value={parent.email}
            onChange={(e) => update("email", e.target.value)}
          />
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={parent.relationship}
            onChange={(e) => update("relationship", e.target.value as Relationship)}
          >
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          This parent's initial login will be their ID number, used as both
          the username and starting password. They can change it later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm"
          placeholder="Search by name, phone, or ID number..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {searching && <p className="text-xs text-gray-400 mt-2">Searching...</p>}

      {!searching && results.length > 0 && (
        <div className="mt-2 border border-gray-100 rounded-lg divide-y divide-gray-50">
          {results.map((parent) => (
            <button
              key={parent.id}
              onClick={() => onSelectParent(parent)}
              className="w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900">{parent.fullName}</p>
              <p className="text-xs text-gray-500">
                {parent.phoneNumber} · {parent.relationship}
                {parent.learners && parent.learners.length > 0 && (
                  <> · already has {parent.learners.length} learner(s) registered</>
                )}
              </p>
            </button>
          ))}
        </div>
      )}

      {!searching && query.length >= 2 && results.length === 0 && (
        <p className="text-xs text-gray-400 mt-2">No matching parent found.</p>
      )}

      <button
        onClick={() => setMode("create")}
        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 mt-3"
      >
        <UserPlus size={14} />
        This parent isn't registered yet — create new
      </button>
    </div>
  );
}
