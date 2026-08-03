
"use client";

import { useState } from "react";
import {
  Home,
  BarChart2,
  Calendar,
  User,
  Bell,
  Calculator,
  BookOpen,
  FlaskConical,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    icon: Calculator,
    score: 78,
    color: "bg-teal-500",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    id: 2,
    name: "English",
    icon: BookOpen,
    score: 65,
    color: "bg-purple-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    name: "Science",
    icon: FlaskConical,
    score: 54,
    color: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function ParentDashboardPage() {
  const [tab, setTab] = useState("home");

  return (
    <main className="min-h-screen bg-[#E9E9EF] p-6">

      <div className="mx-auto max-w-6xl overflow-hidden rounded-[30px] bg-gray-100 shadow-xl">

        {/* ================= HEADER ================= */}

        <div className="bg-[#6C5CE7] px-10 py-8">

       <div className="flex items-center justify-between">

      <div>

       <p className="text-sm text-white/80">
         Good Morning,
        </p>

        <h1 className="mt-1 text-4xl font-bold text-white">
         Mrs Mokoena
       </h1>

      <p className="mt-3 text-white/90">
       Monitor your child's academic progress.
      </p>

       </div>

      <button className="rounded-full bg-white/20 p-4 hover:bg-white/30">

       <Bell className="h-6 w-6 text-white" />

      </button>

       </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="p-10">

              {/* ================= STUDENT SUMMARY ================= */}

      <div className="rounded-2xl bg-white p-6 shadow-md">

       <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

      <div className="flex items-center gap-5">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6C5CE7] text-2xl font-bold text-white">
        TM
      </div>

      <div>

      <h2 className="text-2xl font-bold text-gray-800">
      Thabo Mokoena
       </h2>

      <p className="mt-1 text-gray-500">
       Grade 9A • Term 2
       </p>

       </div>

       </div>

      <div className="grid grid-cols-2 gap-4">

       <div className="rounded-xl bg-gray-50 px-8 py-5 text-center">

         <p className="text-3xl font-bold text-[#6C5CE7]">
         87%
        </p>

        <p className="mt-1 text-sm text-gray-500">
         Attendance
         </p>

         </div>

        <div className="rounded-xl bg-gray-50 px-8 py-5 text-center">

        <p className="text-3xl font-bold text-[#6C5CE7]">
        71%
        </p>

      <p className="mt-1 text-sm text-gray-500">
          Term Average
       </p>

       </div>

       </div>

       </div>

       </div>

          {/* ================= NAVIGATION ================= */}

      <div className="mt-8 flex flex-wrap gap-4">

        <button
          onClick={() => setTab("home")}
            className={`flex items-center rounded-xl px-6 py-3 font-semibold ${
            tab === "home"
            ? "bg-[#6C5CE7] text-white"
             : "bg-white text-gray-700 shadow"
       }`}
        >
       <Home className="mr-2 h-5 w-5" />
         Home
        </button>

        <button
          onClick={() => setTab("marks")}
          className={`flex items-center rounded-xl px-6 py-3 font-semibold ${
          tab === "marks"
          ? "bg-[#6C5CE7] text-white"
          : "bg-white text-gray-700 shadow"
      }`}
        >
       <BarChart2 className="mr-2 h-5 w-5" />
       Marks
      </button>

            <button
         onClick={() => setTab("exams")}
        className={`flex items-center rounded-xl px-6 py-3 font-semibold ${
        tab === "exams"
        ? "bg-[#6C5CE7] text-white"
       : "bg-white text-gray-700 shadow"
      }`}
      >
    <Calendar className="mr-2 h-5 w-5" />
       Exams
       </button>

        <button
           onClick={() => setTab("profile")}
           className={`flex items-center rounded-xl px-6 py-3 font-semibold ${
           tab === "profile"
            ? "bg-[#6C5CE7] text-white"
           : "bg-white text-gray-700 shadow"
       }`}
      >
      <User className="mr-2 h-5 w-5" />
      Profile
      </button>

      </div>  
               {/* ================= HOME ================= */}

        {tab === "home" && (

      <div className="mt-8 space-y-6">

      <div className="rounded-2xl bg-white p-6 shadow-md">

      <h2 className="text-2xl font-bold text-gray-800">
       Subject Performance
       </h2>

       <p className="mt-2 text-gray-500">
        View your child's latest academic progress.
       </p>

       <div className="mt-8 space-y-5">

      {subjects.map((subject) => {

      const Icon = subject.icon;

      return (

       <div
       key={subject.id}
       className="rounded-xl border border-gray-200 p-5 transition hover:border-[#6C5CE7] hover:shadow-md"
      >

      <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">
      <div
      className={`flex h-14 w-14 items-center justify-center rounded-xl ${subject.iconBg}`}
      >

      <Icon
       className={`h-7 w-7 ${subject.iconColor}`}
        />

      </div>

      <div>

      <h3 className="text-lg font-semibold text-gray-800">
      {subject.name}
      </h3>
       <p className="text-sm text-gray-500">
       Current Performance
      </p>

      </div>

      </div> 

      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
       <div
        className={`${subject.color} h-3 rounded-full`}
        style={{ width: `${subject.score}%` }}
         />

       </div>

        </div>

            );

          })}

     </div>

     </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800">
        Recent Notifications
      </h2>

      <div className="mt-8 rounded-xl border border-dashed border-gray-300 py-12 text-center">

      <Bell className="mx-auto h-10 w-10 text-gray-300" />

      <p className="mt-4 text-gray-500">
      No notifications available.
      </p>

       </div>

       </div>

       </div>

        )}
             {/* ================= MARKS ================= */}

        {tab === "marks" && (

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          Academic Results
          </h2>
          <p className="mt-2 text-gray-500">
          Current subject performance.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">

          <table className="w-full">

          <thead className="bg-gray-100">

          <tr>

         <th className="px-6 py-4 text-left">
           Subject
          </th>

          <th className="px-6 py-4 text-left">
           Mark
          </th>

         <th className="px-6 py-4 text-left">
         Status
         </th>

       </tr>
        </thead>

        <tbody>

        {subjects.map((subject) => (

        <tr
         key={subject.id}
         className="border-t"
          >
          <td className="px-6 py-4">
           {subject.name}
           </td>
          <td className="px-6 py-4 font-semibold text-[#6C5CE7]">
           {subject.score}%
          </td>

          <td className="px-6 py-4">

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
           Progressing
          </span>

          </td>

          </tr>

          ))}

         </tbody>

         </table>

         </div>

         </div>

        )}
          {/* ================= EXAMS ================= */}

        {tab === "exams" && (

          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-md">

            <Calendar className="mx-auto h-14 w-14 text-gray-300" />

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              Upcoming Exams
            </h2>

            <p className="mt-3 text-gray-500">
              No exam information available.
            </p>

          </div>

        )}

        {/* ================= PROFILE ================= */}

        {tab === "profile" && (

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">

            <h2 className="text-2xl font-bold text-gray-800">
              Parent Profile
            </h2>

            <div className="mt-8 space-y-5">
            <div>
            <p className="text-sm text-gray-500">
             Parent Name
            </p>
            <p className="font-semibold text-gray-800">
               Mrs Mokoena
             </p>
            </div>
            <div>
            <p className="text-sm text-gray-500">
              Learner
             </p>
             <p className="font-semibold text-gray-800">
             Thabo Mokoena
             </p>
            </div>
            <div>
            <p className="text-sm text-gray-500">
             Grade
            </p>
            <p className="font-semibold text-gray-800">
            Grade 9A
           </p>
           </div>
           <div>
          <p className="text-sm text-gray-500">
           Email
          </p>
          <p className="font-semibold text-gray-800">
          parent@email.com
         </p>
        </div>
        <div>
        <p className="text-sm text-gray-500">
        Phone
       </p>
       <p className="font-semibold text-gray-800">
      +27 71 234 5678
     </p>

     </div>

     </div>

    </div>

   )}
      </div>

    </div>

  </main>

);

}
