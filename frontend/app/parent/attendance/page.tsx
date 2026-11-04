"use client";

import { useState } from "react";

export default function ParentAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("August");

  const attendanceRecords = [
    { date: "01 August 2026", day: "Friday", status: "Present" },
    { date: "04 August 2026", day: "Monday", status: "Present" },
    { date: "05 August 2026", day: "Tuesday", status: "Late", note: "Arrived 15 mins late" },
    { date: "06 August 2026", day: "Wednesday", status: "Absent", note: "Doctor's appointment" },
    { date: "07 August 2026", day: "Thursday", status: "Present" },
    { date: "08 August 2026", day: "Friday", status: "Present" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1">Monitor your child's attendance and school participation.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-2">87%</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Present</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">87</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Absent</p>
          <p className="text-3xl font-bold text-red-500 mt-2">13</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Late</p>
          <p className="text-3xl font-bold text-orange-500 mt-2">4</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Attendance Record</h2>
            <p className="text-sm text-gray-500 mt-1">Recent history.</p>
          </div>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 text-sm outline-none focus:border-[#6B4FA0]">
            <option>July</option>
            <option>August</option>
            <option>September</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Day</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase">Note</th>
                <th className="text-center px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.date} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-900 font-medium text-sm whitespace-nowrap">{record.date}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{record.day}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{record.note || <span className="text-gray-300 italic">None</span>}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                      record.status === "Present" ? "bg-green-100 text-green-700" :
                      record.status === "Absent" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${record.status === "Present" ? "bg-green-500" : record.status === "Absent" ? "bg-red-500" : "bg-orange-500"}`}></span>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}