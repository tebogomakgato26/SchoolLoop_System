"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ParentDashboard() {
  const [parent, setParent] = useState({
    name: "Parent",
    childName: "Learner",
    childGrade: "N/A",
  });

  useEffect(() => {
    const saved = localStorage.getItem("schoolLoopParent");
    if (saved) {
      const parsed = JSON.parse(saved);
      setParent({
        name: parsed.name || "Parent",
        childName: parsed.childName || "Learner",
        childGrade: parsed.childGrade || "N/A",
      });
    }
  }, []);

  const childInitials = parent.childName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Good morning, {parent.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here is an overview of {parent.childName.split(" ")[0]}'s progress today.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-[#F4F1FB] rounded-full opacity-50 pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#6B4FA0] text-white flex items-center justify-center text-3xl font-bold flex-shrink-0 shadow-lg">
            {childInitials || "?"}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{parent.childName}</h2>
            <p className="text-gray-500 text-sm mt-1">Grade {parent.childGrade} • Learner Record</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Attendance: 87%
              </span>
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Average: 78%
              </span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex-shrink-0">
            <Link href="/parent/profile" className="inline-block text-sm font-semibold text-[#6B4FA0] border-2 border-[#6B4FA0] px-5 py-2.5 rounded-xl hover:bg-[#F4F1FB] transition">
              View Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Latest Alert</h3>
            <Link href="/parent/alerts" className="text-xs font-semibold text-[#6B4FA0] hover:underline">View Alerts</Link>
          </div>
          <div className="rounded-2xl p-5 flex-1 border bg-red-50 border-red-100">
            <p className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2">Urgent</p>
            <p className="text-sm font-bold text-gray-900">School Closes Early Tomorrow</p>
            <p className="text-sm text-gray-700 mt-1">Please note that the school will close at 12:00 PM tomorrow.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Recent Marks</h3>
            <Link href="/parent/marks" className="text-xs font-semibold text-[#6B4FA0] hover:underline">View All</Link>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-sm font-medium text-gray-700">Mathematics</span>
              <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-sm">78%</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-sm font-medium text-gray-700">Natural Science</span>
              <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-sm">82%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">English</span>
              <span className="font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded text-sm">65%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-[#6B4FA0] rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white relative">
         <div>
            <h3 className="text-xl font-bold">Attendance is at 87%</h3>
            <p className="text-purple-100 text-sm mt-1">{parent.childName.split(" ")[0]} has been present for 87 out of 100 school days.</p>
         </div>
         <Link href="/parent/attendance" className="bg-white text-[#6B4FA0] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition w-full sm:w-auto text-center">
            View Attendance
         </Link>
      </div>
    </div>
  );
}

