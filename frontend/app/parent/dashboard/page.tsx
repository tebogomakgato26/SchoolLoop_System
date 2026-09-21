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
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    id: 2,
    name: "English",
    icon: BookOpen,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    name: "Science",
    icon: FlaskConical,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export default function ParentDashboardPage() {
  const [tab, setTab] = useState("home");

  return (
  <main className="min-h-screen bg-gray-100">

  <div className="flex min-h-screen">

    {/* ================= SIDEBAR ================= */}

    <aside className="w-72 bg-[#5B4CF0] text-white flex flex-col">

      <div className="p-8">

        <h1 className="text-3xl font-bold">
          SchoolLoop
        </h1>

        <p className="mt-2 text-white/70">
          Parent Portal
        </p>

      </div>

      <nav className="flex-1 px-5 space-y-3">

        <button
          onClick={() => setTab("home")}
          className={`w-full flex items-center gap-4 rounded-xl px-5 py-4 transition ${
            tab === "home"
              ? "bg-white text-[#5B4CF0]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Home className="h-5 w-5" />
          Dashboard
        </button>

        <button
          onClick={() => setTab("marks")}
          className={`w-full flex items-center gap-4 rounded-xl px-5 py-4 transition ${
            tab === "marks"
              ? "bg-white text-[#5B4CF0]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <BarChart2 className="h-5 w-5" />
          Marks
        </button>

        <button
          onClick={() => setTab("exams")}
          className={`w-full flex items-center gap-4 rounded-xl px-5 py-4 transition ${
            tab === "exams"
              ? "bg-white text-[#5B4CF0]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <Calendar className="h-5 w-5" />
          Exams
        </button>

        <button
          onClick={() => setTab("profile")}
          className={`w-full flex items-center gap-4 rounded-xl px-5 py-4 transition ${
            tab === "profile"
              ? "bg-white text-[#5B4CF0]"
              : "text-white hover:bg-white/10"
          }`}
        >
          <User className="h-5 w-5" />
          Profile
        </button>

      </nav>

    </aside>

    {/* ================= MAIN CONTENT ================= */}

    <section className="flex-1 p-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, Mrs Mokoena
          </h1>

          <p className="mt-2 text-gray-500">
            Monitor your child's academic progress.
          </p>

        </div>

        <button className="rounded-full bg-white p-4 shadow">

          <Bell className="h-6 w-6 text-[#5B4CF0]" />

        </button>

      </div>  
        {/* ================= STUDENT SUMMARY ================= */}

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-6">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#5B4CF0] text-2xl font-bold text-white">
              TM
            </div>

            <div>

              <h2 className="text-3xl font-bold text-gray-800">
                Thabo Mokoena
              </h2>

              <p className="mt-1 text-gray-500">
                Grade 9A • Term 2
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-xl bg-gray-50 px-10 py-6 text-center">

              <p className="text-4xl font-bold text-[#5B4CF0]">
                87%
              </p>

              <p className="mt-2 text-gray-500">
                Attendance
              </p>

            </div>

            <div className="rounded-xl bg-gray-50 px-10 py-6 text-center">

              <p className="text-4xl font-bold text-[#5B4CF0]">
                71%
              </p>

              <p className="mt-2 text-gray-500">
                Term Average
              </p>

            </div>

          </div>

        </div>

      </div>
          {/* ================= HOME ================= */}

      {tab === "home" && (

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Subject Performance */}

          <div className="rounded-2xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold text-gray-800">
              Subject Performance
            </h2>

            <p className="mt-2 text-gray-500">
              View your child's enrolled subjects.
            </p>
<div className="mt-8">

  {subjects.map((subject) => {

    const Icon = subject.icon;

    return (

      <div
        key={subject.id}
        className="flex items-center justify-between border-b border-gray-200 py-5"
      >

        <div className="flex items-center gap-5">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl ${subject.iconBg}`}
          >
            <Icon className={`h-7 w-7 ${subject.iconColor}`} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {subject.name}
            </h3>
          </div>

        </div>

      </div>

    );

  })}

  <button className="mt-6 flex w-full items-center justify-between text-lg font-semibold text-[#5B4CF0] hover:text-[#4338CA]">

    <span>View all subjects</span>

    <span className="text-3xl">›</span>

  </button>

</div>

          </div>

          {/* Notifications */}

          <div className="rounded-2xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold text-gray-800">
              Recent Notifications
            </h2>

            <div className="mt-8 rounded-xl border border-dashed border-gray-300 py-20 text-center">

              <Bell className="mx-auto h-12 w-12 text-gray-300" />

              <h3 className="mt-4 text-xl font-semibold text-gray-700">
                No new notifications
              </h3>

              <p className="mt-2 text-gray-500">
                You're all caught up!
              </p>

            </div>

          </div>

        </div>

      )}    
        {/* ================= MARKS ================= */}

      {tab === "marks" && (

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold text-gray-800">
                Academic Results
              </h2>

              <p className="mt-2 text-gray-500">
                Latest performance by subject.
              </p>

            </div>

          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left font-semibold">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Teacher
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {subjects.map((subject) => (

                  <tr
                    key={subject.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${subject.iconBg}`}
                        >

                          <subject.icon
                            className={`h-6 w-6 ${subject.iconColor}`}
                          />

                        </div>

                        <span className="font-medium">
                          {subject.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      Mrs Smith
                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
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

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">

          <h2 className="text-3xl font-bold text-gray-800">
            Upcoming Exams
          </h2>

          <p className="mt-2 text-gray-500">
            Examination timetable.
          </p>

          <div className="mt-8 rounded-xl border border-dashed border-gray-300 py-20 text-center">

            <Calendar className="mx-auto h-14 w-14 text-gray-300" />

            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              No Exams Scheduled
            </h3>

            <p className="mt-2 text-gray-500">
              Your child's upcoming exams will appear here.
            </p>

          </div>

        </div>

      )}

      {/* ================= PROFILE ================= */}

      {tab === "profile" && (

        <div className="mt-10 rounded-2xl bg-white p-8 shadow">

          <h2 className="text-3xl font-bold text-gray-800">
            Parent Profile
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>

              <p className="text-sm text-gray-500">
                Parent Name
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                Mrs Mokoena
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Learner
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                Thabo Mokoena
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Grade
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                Grade 9A
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                parent@email.com
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Phone
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                +27 71 234 5678
              </p>

            </div>

          </div>

        </div>

      )}

    </section>

  </div>

</main>

);

}
