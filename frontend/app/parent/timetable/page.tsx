"use client";

import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const schedule = [
  { id: 1, day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Dlamini", room: "Room 12" },
  { id: 2, day: "Monday", time: "09:00 - 10:00", subject: "English Home Language", teacher: "Ms. Williams", room: "Room 08" },
  { id: 3, day: "Monday", time: "10:00 - 10:30", subject: "BREAK", teacher: "", room: "" },
  { id: 4, day: "Monday", time: "10:30 - 12:00", subject: "Natural Science", teacher: "Mrs. Naidoo", room: "Lab A" },
  { id: 5, day: "Tuesday", time: "08:00 - 09:00", subject: "Life Orientation", teacher: "Mr. Smith", room: "Room 01" },
  { id: 6, day: "Tuesday", time: "09:00 - 10:00", subject: "Mathematics", teacher: "Mr. Dlamini", room: "Room 12" },
  { id: 7, day: "Wednesday", time: "08:00 - 09:00", subject: "Natural Science", teacher: "Mrs. Naidoo", room: "Lab A" },
  { id: 8, day: "Thursday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Dlamini", room: "Room 12" },
  { id: 9, day: "Friday", time: "08:00 - 09:00", subject: "English Home Language", teacher: "Ms. Williams", room: "Room 08" },
];

export default function ParentTimetable() {
  const [activeDay, setActiveDay] = useState("Monday");

  const getScheduleForDay = (day: string) => schedule.filter((s) => s.day === day);

  const getSubjectStyle = (subject: string) => {
    if (subject === "BREAK") return "bg-gray-50 text-gray-400 border-gray-200";
    if (subject.includes("Mathematics")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (subject.includes("English")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (subject.includes("Science")) return "bg-green-50 text-green-700 border-green-200";
    return "bg-orange-50 text-orange-700 border-orange-200";
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Timetable</h1>
        <p className="text-gray-500 mt-1">View your child's weekly class schedule.</p>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-5 divide-x divide-gray-100">
          {days.map((day) => (
            <div key={day} className="bg-gray-50 py-4 text-center border-b border-gray-100">
              <p className="text-sm font-bold text-gray-900 uppercase">{day}</p>
            </div>
          ))}
          {days.map((day) => (
            <div key={day} className="p-3 space-y-3 min-h-[500px]">
              {getScheduleForDay(day).map((item) => (
                <div key={item.id} className={`p-3 rounded-xl border ${getSubjectStyle(item.subject)}`}>
                  <p className="text-[10px] font-bold opacity-70 mb-1">{item.time}</p>
                  <p className="text-sm font-bold leading-tight">{item.subject}</p>
                  {item.subject !== "BREAK" && (
                    <div className="mt-2 text-xs opacity-80">
                      <p>{item.teacher}</p>
                      <p className="font-semibold">{item.room}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4 scrollbar-hide">
          {days.map((day) => (
            <button key={day} onClick={() => setActiveDay(day)} className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap ${activeDay === day ? "bg-[#6B4FA0] text-white" : "bg-white text-gray-500 border border-gray-200"}`}>
              {day}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 space-y-3">
          {getScheduleForDay(activeDay).map((item) => (
            <div key={item.id} className={`p-4 rounded-2xl border ${getSubjectStyle(item.subject)}`}>
              <p className="text-xs font-bold opacity-70 mb-1">{item.time}</p>
              <p className="text-base font-bold">{item.subject}</p>
              {item.subject !== "BREAK" && <p className="text-xs opacity-80 mt-1">{item.teacher} • {item.room}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}