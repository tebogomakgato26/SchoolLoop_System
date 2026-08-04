"use client";

export default function ParentPortal() {
  const subjects = [
    { name: "Mathematics", mark: 78 },
    { name: "English", mark: 69 },
    { name: "Natural Science", mark: 83 },
    { name: "Geography", mark: 74 },
    { name: "Life Orientation", mark: 91 },
  ];

  return (
    <main className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <header className="bg-gradient-to-r from-[#6B4FA0] to-[#8B70D8] shadow-lg">

        <div className="max-w-7xl mx-auto px-10 py-8 flex justify-between items-center">

          <div>

            <p className="text-purple-100 text-lg">
              WELCOME BACK
            </p>

            <h1 className="text-5xl font-bold text-white mt-2">
              Parent Portal
            </h1>

            <p className="text-purple-200 mt-3">
              Stay connected to your child's academic journey.
            </p>

          </div>

          <div className="bg-white/20 rounded-full p-5">

            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>

          </div>

        </div>

      </header>

      {/* ================= BODY ================= */}

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

        <aside className="w-64 min-h-screen bg-[#4F3D97] text-white shadow-lg">

          <div className="p-8 border-b border-purple-400">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">

                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4F3D97"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  SchoolLoop
                </h2>

                <p className="text-purple-200 text-sm">
                  Parent Portal
                </p>

              </div>

            </div>

          </div>

          <nav className="mt-8 px-4 space-y-3">

            <button className="w-full bg-white text-[#4F3D97] rounded-xl px-4 py-3 text-left font-semibold">
              Dashboard
            </button>

            <button className="w-full hover:bg-purple-600 rounded-xl px-4 py-3 text-left transition">
              Results
            </button>

            <button className="w-full hover:bg-purple-600 rounded-xl px-4 py-3 text-left transition">
              Attendance
            </button>

            <button className="w-full hover:bg-purple-600 rounded-xl px-4 py-3 text-left transition">
              Teachers
            </button>

            <button className="w-full hover:bg-purple-600 rounded-xl px-4 py-3 text-left transition">
              Messages
            </button>

            <button className="w-full hover:bg-purple-600 rounded-xl px-4 py-3 text-left transition">
              Profile
            </button>

          </nav>

        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <section className="flex-1 p-10">

          {/* ================= STUDENT PROFILE ================= */}

          <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-6">

                <div className="w-24 h-24 rounded-full bg-[#6B4FA0] text-white flex items-center justify-center text-3xl font-bold">
                  YM
                </div>

                <div>

                  <h2 className="text-3xl font-bold text-gray-800">
                    Yamkela Mgcubhe
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Grade 9A
                  </p>

                  <p className="text-gray-500">
                    Student Number: 222050221
                  </p>

                  <p className="text-gray-500">
                    Parent: Mrs Mgcubhe
                  </p>

                </div>

              </div>

              <button className="bg-[#6B4FA0] text-white px-6 py-3 rounded-xl hover:bg-[#563c87] transition">
                Download Report
              </button>

            </div>

          </div>

          {/* ================= DASHBOARD CARDS ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h3 className="text-gray-500 text-sm">
                Attendance
              </h3>

              <p className="text-4xl font-bold text-green-600 mt-3">
                87%
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h3 className="text-gray-500 text-sm">
                Term Average
              </h3>

              <p className="text-4xl font-bold text-blue-600 mt-3">
                74%
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h3 className="text-gray-500 text-sm">
                Subjects
              </h3>

              <p className="text-4xl font-bold text-purple-600 mt-3">
                5
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

              <h3 className="text-gray-500 text-sm">
                Behaviour
              </h3>

              <p className="text-4xl font-bold text-orange-500 mt-3">
                Excellent
              </p>

            </div>

          </div>

          {/* ================= ATTENDANCE + NOTIFICATIONS ================= */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Attendance Overview
              </h2>

              <div className="flex justify-center">

                <div className="w-40 h-40 rounded-full border-[14px] border-green-500 flex items-center justify-center">

                  <div className="text-center">

                    <p className="text-5xl font-bold text-green-600">
                      87%
                    </p>

                    <p className="text-gray-500">
                      Present
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Notifications
              </h2>

              <div className="space-y-5">

                <div className="border-l-4 border-green-500 pl-4">

                  <h4 className="font-semibold">
                    Attendance Updated
                  </h4>

                  <p className="text-sm text-gray-500">
                    Attendance is now 87%.
                  </p>

                </div>

                <div className="border-l-4 border-blue-500 pl-4">

                  <h4 className="font-semibold">
                    Mathematics Test
                  </h4>

                  <p className="text-sm text-gray-500">
                    New result uploaded.
                  </p>

                </div>

                <div className="border-l-4 border-purple-500 pl-4">

                  <h4 className="font-semibold">
                    Parent Meeting
                  </h4>

                  <p className="text-sm text-gray-500">
                    Friday • 15:00
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= SUBJECT PERFORMANCE ================= */}

          <div className="bg-white rounded-3xl shadow-sm p-8 mt-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Subject Performance
            </h2>

            <div className="space-y-6">

              {subjects.map((subject) => (

                <div key={subject.name}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium text-gray-700">
                      {subject.name}
                    </span>

                    <span className="font-bold text-[#6B4FA0]">
                      {subject.mark}%
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-[#6B4FA0] h-3 rounded-full"
                      style={{ width: `${subject.mark}%` }}
                    ></div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* ================= RECENT RESULTS + QUICK ACTIONS ================= */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            {/* Results Table */}

            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Recent Results
              </h2>

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left pb-3 text-gray-500">Subject</th>
                    <th className="text-left pb-3 text-gray-500">Assessment</th>
                    <th className="text-left pb-3 text-gray-500">Mark</th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="py-4">Mathematics</td>
                    <td>Test 3</td>
                    <td className="font-bold text-green-600">78%</td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-4">English</td>
                    <td>Essay</td>
                    <td className="font-bold text-blue-600">69%</td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-4">Natural Science</td>
                    <td>Practical</td>
                    <td className="font-bold text-purple-600">83%</td>

                  </tr>

                  <tr>

                    <td className="py-4">History</td>
                    <td>Assignment</td>
                    <td className="font-bold text-orange-500">74%</td>

                  </tr>

                </tbody>

              </table>

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                <button className="w-full bg-[#6B4FA0] text-white py-3 rounded-xl hover:bg-[#563c87] transition">
                  Download Report
                </button>

                <button className="w-full border border-[#6B4FA0] text-[#6B4FA0] py-3 rounded-xl hover:bg-purple-50 transition">
                  Contact Teacher
                </button>

                <button className="w-full border border-[#6B4FA0] text-[#6B4FA0] py-3 rounded-xl hover:bg-purple-50 transition">
                  School Calendar
                </button>

                <button className="w-full border border-[#6B4FA0] text-[#6B4FA0] py-3 rounded-xl hover:bg-purple-50 transition">
                  View Timetable
                </button>

              </div>

            </div>

          </div>

          {/* ================= UPCOMING EVENTS ================= */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            {/* Upcoming Events */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Upcoming Events
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between items-center border-b pb-4">

                  <div>
                    <h3 className="font-semibold">Parent Meeting</h3>
                    <p className="text-sm text-gray-500">
                      Friday • 15:00
                    </p>
                  </div>

                  <span className="bg-purple-100 text-[#6B4FA0] px-3 py-1 rounded-full text-sm">
                    Upcoming
                  </span>

                </div>

                <div className="flex justify-between items-center border-b pb-4">

                  <div>
                    <h3 className="font-semibold">Mathematics Test</h3>
                    <p className="text-sm text-gray-500">
                      Monday • Room 12
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    Academic
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <div>
                    <h3 className="font-semibold">Sports Day</h3>
                    <p className="text-sm text-gray-500">
                      Next Wednesday
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    Event
                  </span>

                </div>

              </div>

            </div>

            {/* School Announcements */}

            <div className="bg-white rounded-3xl shadow-sm p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                School Announcements
              </h2>

              <div className="space-y-6">

                <div>

                  <h3 className="font-semibold text-[#6B4FA0]">
                    Winter Uniform Reminder
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Learners should wear full winter uniform from Monday.
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold text-[#6B4FA0]">
                    Report Collection
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Term reports will be available from 20 August.
                  </p>

                </div>

                <div>

                  <h3 className="font-semibold text-[#6B4FA0]">
                    School Fees
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Kindly ensure all outstanding fees are settled before month-end.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= FOOTER ================= */}

          <footer className="mt-10 bg-white rounded-3xl shadow-sm p-6">

            <div className="flex flex-col md:flex-row justify-between items-center">

              <div>

                <h3 className="text-xl font-bold text-gray-800">
                  SchoolLoop Parent Portal
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Empowering parents through better communication.
                </p>

              </div>

              <div className="text-sm text-gray-400 mt-4 md:mt-0">
                © 2026 SchoolLoop • South Africa 🇿🇦
              </div>

            </div>

          </footer>

        </section>

      </div>

    </main>
  );
}