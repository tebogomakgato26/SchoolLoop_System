"use client";

import { useState, useEffect } from "react";

type Mark = {
  subject: string;
  teacher: string;
  mark: number;
  grade: string;
  comment: string;
};

// Default data if the teacher hasn't saved anything yet
const defaultMarks: Mark[] = [
  { subject: "Mathematics", teacher: "Mr. Dlamini", mark: 78, grade: "B", comment: "Consistent hard work." },
  { subject: "Natural Science", teacher: "Mrs. Naidoo", mark: 82, grade: "A", comment: "Excellent understanding." },
  { subject: "English Home Language", teacher: "Ms. Williams", mark: 65, grade: "C", comment: "Needs to practice writing." },
];

export default function ParentMarks() {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  // Load marks from "database" (localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("schoolLoopMarks");
    if (saved) {
      setMarks(JSON.parse(saved));
    } else {
      // Seed the database with default marks if empty
      localStorage.setItem("schoolLoopMarks", JSON.stringify(defaultMarks));
      setMarks(defaultMarks);
    }
    setLoading(false);
  }, []);

  // Calculate average
  const average = marks.length === 0 ? 0 : Math.round(marks.reduce((sum, item) => sum + item.mark, 0) / marks.length);

  // Simulate Teacher updating a mark
  const simulateTeacherUpdate = () => {
    const updatedMarks = marks.map((m) => 
      m.subject === "Mathematics" ? { ...m, mark: 95, grade: "A", comment: "Outstanding improvement!" } : m
    );
    localStorage.setItem("schoolLoopMarks", JSON.stringify(updatedMarks));
    setMarks(updatedMarks);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading report card...</div>;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Report Card</h1>
          <p className="text-gray-500 mt-1">View academic performance and teacher feedback.</p>
        </div>
        
        {/* TEST BUTTON: This simulates the Teacher portal saving a new mark */}
        <button onClick={simulateTeacherUpdate} className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-lg font-semibold text-gray-700 transition">
          Simulate Teacher Update
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center border-4 border-green-100">
            <span className="text-xl font-bold">{average}%</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Overall Average</p>
            <p className="text-xl font-bold text-gray-900 mt-1">Good Standing</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Subject Breakdown</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {marks.map((subject) => (
            <div key={subject.subject} className="p-6 sm:p-8 hover:bg-gray-50 transition">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{subject.subject}</h3>
                  <p className="text-sm text-gray-500 mb-4">Teacher: {subject.teacher}</p>
                  <div className="bg-[#F8F9FA] border border-gray-100 rounded-2xl p-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Teacher's Comment</p>
                    <p className="text-sm text-gray-700 italic">"{subject.comment}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:flex-col md:items-end md:border-l md:border-gray-100 md:pl-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Mark</p>
                    <p className={`text-3xl font-bold ${subject.mark >= 80 ? "text-green-600" : subject.mark >= 70 ? "text-blue-600" : "text-orange-500"}`}>{subject.mark}%</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Grade</p>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${subject.grade === "A" ? "bg-green-100 text-green-700" : subject.grade === "B" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                      {subject.grade}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}