"use client";

import { useEffect, useState } from "react";
import { useLearners } from "@/lib/context/LearnerContext";

export default function ConnectedHeader() {
  const { teacherName, classes, selectedClass, selectedClassId, selectClass } = useLearners();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-ZA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="border-b border-teal-700 pb-4 text-white">
      <p className="text-xs font-medium text-teal-200">{date}</p>
      <h1 className="mt-1 text-lg font-bold leading-tight">{teacherName || "Loading..."}</h1>
      <p className="text-sm text-teal-200">
        {selectedClass
          ? `${selectedClass.subject} - ${selectedClass.className}`
          : "No class assigned"}
      </p>

      {classes.length > 1 && (
        <select
          value={selectedClassId ?? ""}
          onChange={(e) => selectClass(e.target.value)}
          className="mt-3 w-full rounded-lg border border-teal-600 bg-teal-900 px-2 py-1.5 text-sm text-white"
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.subject} - {c.className}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}