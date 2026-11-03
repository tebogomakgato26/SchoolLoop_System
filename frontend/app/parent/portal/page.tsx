"use client";

import { useEffect, useState } from "react";
import type { ReactNode, FormEvent } from "react";

// TODO: copy this import line from one of your working principal pages.
// It must point to the same authenticated fetch helper they use.
import { authFetch } from "@/lib/auth";

// TODO: change these paths if your backend routes are named differently.
// Only "children" is required. The others are optional: if a route does not
// exist yet, that section simply shows an empty state.
const ENDPOINTS = {
  children: "/parent/children",
  events: "/parent/events",
  announcements: "/parent/announcements",
  timetable: "/parent/timetable",
};

const sections = [
  "Dashboard",
  "Results",
  "Attendance",
  "Teachers",
  "Messages",
  "Profile",
  "Calendar",
  "Timetable",
] as const;

type Section = (typeof sections)[number];

type Subject = { name: string; assessment: string; mark: number };

type Learner = {
  name: string;
  initials: string;
  grade: string;
  studentNumber: string;
  parent: string;
  attendance: number;
  average: number;
};

type SchoolEvent = {
  title: string;
  date: string;
  time: string;
  type: string;
  location: string;
};

type Announcement = { title: string; detail: string };

type TimetableDay = {
  day: string;
  lessons: { time: string; subject: string; room: string }[];
};

type PortalData = {
  learner: Learner;
  subjects: Subject[];
  events: SchoolEvent[];
  announcements: Announcement[];
  timetable: TimetableDay[];
};

/* ---------- Data loading helpers ---------- */

async function getList(path: string): Promise<any[]> {
  try {
    const res = await authFetch(path);
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    return [];
  } catch {
    return [];
  }
}

function toSubjects(raw: any): Subject[] {
  const list = raw.subjects ?? raw.marks ?? raw.results ?? [];
  if (!Array.isArray(list)) return [];
  return list.map((s: any) => ({
    name: String(s.name ?? s.subject ?? s.subjectName ?? "Subject"),
    assessment: String(s.assessment ?? s.assessmentName ?? s.type ?? "Assessment"),
    mark: Number(s.mark ?? s.score ?? s.percentage ?? 0),
  }));
}

function toLearner(raw: any, subjects: Subject[]): Learner {
  const first = raw.firstName ?? raw.first_name ?? "";
  const last = raw.lastName ?? raw.last_name ?? raw.surname ?? "";
  const name =
    `${first} ${last}`.trim() || raw.name || raw.fullName || "Learner";

  const initials = String(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0].toUpperCase())
    .join("");

  const computedAverage =
    subjects.length > 0
      ? Math.round(subjects.reduce((sum, s) => sum + s.mark, 0) / subjects.length)
      : 0;

  return {
    name,
    initials,
    grade: String(raw.grade ?? raw.className ?? raw.class ?? ""),
    studentNumber: String(raw.studentNumber ?? raw.idNumber ?? raw.id ?? ""),
    parent: String(raw.parentName ?? raw.parent?.name ?? ""),
    attendance: Number(
      raw.attendance ?? raw.attendanceRate ?? raw.attendancePercentage ?? 0
    ),
    average: Number(raw.average ?? raw.termAverage ?? computedAverage),
  };
}

async function loadPortalData(): Promise<PortalData> {
  const res = await authFetch(ENDPOINTS.children);
  if (!res.ok) {
    throw new Error(`Could not load learner details (error ${res.status}).`);
  }

  const body = await res.json();
  const children = Array.isArray(body) ? body : body.children ?? [];
  const child = children[0];

  if (!child) {
    throw new Error("No learner is linked to this parent account.");
  }

  const subjects = toSubjects(child);

  const [events, announcements, timetable] = await Promise.all([
    getList(ENDPOINTS.events),
    getList(ENDPOINTS.announcements),
    getList(ENDPOINTS.timetable),
  ]);

  return {
    learner: toLearner(child, subjects),
    subjects,
    events: events as SchoolEvent[],
    announcements: announcements as Announcement[],
    timetable: timetable as TimetableDay[],
  };
}

/* ---------- Small shared components ---------- */

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 rounded-3xl bg-white p-5 shadow-sm sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
      {children}
    </h2>
  );
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function todayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/* ---------- Page: loads the data, then renders the portal ---------- */

export default function ParentPortal() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPortalData()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading your portal...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">
            We could not load your portal
          </h1>
          <p className="mt-3 text-red-600">{error || "No data was returned."}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return <PortalView {...data} />;
}

/* ---------- The portal UI (all data now arrives through props) ---------- */

function PortalView({
  learner,
  subjects,
  events,
  announcements,
  timetable,
}: PortalData) {
  const [activeSection, setActiveSection] = useState<Section>("Dashboard");
  const [messageDraft, setMessageDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [selectedDay, setSelectedDay] = useState(
    timetable[0]?.day ?? "Monday"
  );

  function navigate(section: Section) {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function downloadReport() {
    const report = [
      "SCHOOLLOOP PARENT PORTAL",
      "LEARNER REPORT",
      "========================",
      `Learner: ${learner.name}`,
      `Grade: ${learner.grade}`,
      `Student Number: ${learner.studentNumber}`,
      `Parent: ${learner.parent}`,
      "",
      `Attendance: ${learner.attendance}%`,
      `Term Average: ${learner.average}%`,
      "",
      "SUBJECT RESULTS",
      "---------------",
      ...subjects.map((s) => `${s.name} - ${s.assessment}: ${s.mark}%`),
      "",
      `Generated on ${new Date().toLocaleDateString("en-ZA")}.`,
    ].join("\n");

    const file = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SchoolLoop-Learner-Report.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = messageDraft.trim();

    if (!message) return;

    setSentMessages((previous) => [message, ...previous]);
    setMessageDraft("");
  }

  const monthName = calendarMonth.toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });

  const firstWeekday = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0
  ).getDate();

  function dateKey(day: number) {
    const year = calendarMonth.getFullYear();
    const month = String(calendarMonth.getMonth() + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${year}-${month}-${date}`;
  }

  const selectedEvents = events.filter((event) => event.date === selectedDate);

  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const nextEvent =
    sortedEvents.find((event) => event.date >= todayKey()) ?? sortedEvents[0];

  const notifications = [
    {
      title: "Attendance",
      detail: `Attendance is currently ${learner.attendance}%.`,
      color: "border-green-500",
    },
    ...(subjects[0]
      ? [
          {
            title: `${subjects[0].name} ${subjects[0].assessment}`,
            detail: `Result recorded: ${subjects[0].mark}%.`,
            color: "border-blue-500",
          },
        ]
      : []),
    ...(nextEvent
      ? [
          {
            title: nextEvent.title,
            detail: `${formatDate(nextEvent.date)} • ${nextEvent.time}`,
            color: "border-purple-500",
          },
        ]
      : []),
  ];

  const selectedTimetable = timetable.find((day) => day.day === selectedDay);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-[#6B4FA0] to-[#8B70D8] shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-lg text-purple-100">WELCOME BACK</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
              Parent Portal
            </h1>
            <p className="mt-3 text-purple-100">
              Stay connected to your child&apos;s academic journey.
            </p>
          </div>

          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20"
            aria-label="Notifications"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="w-full shrink-0 bg-[#4F3D97] text-white shadow-lg md:min-h-screen md:w-64">
          <div className="border-b border-purple-400 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4F3D97"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold">SchoolLoop</h2>
                <p className="text-sm text-purple-200">Parent Portal</p>
              </div>
            </div>
          </div>

          <nav
            className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 md:grid-cols-1 md:space-y-3"
            aria-label="Parent portal navigation"
          >
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => navigate(section)}
                aria-current={activeSection === section ? "page" : undefined}
                className={`rounded-xl px-3 py-3 text-left text-sm font-semibold transition sm:px-4 sm:text-base ${
                  activeSection === section
                    ? "bg-white text-[#4F3D97]"
                    : "text-white hover:bg-purple-600"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
          {activeSection === "Dashboard" && (
            <div className="space-y-6 sm:space-y-8">
              <Card>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#6B4FA0] text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl">
                      {learner.initials}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        {learner.name}
                      </h2>
                      <p className="mt-2 text-gray-500">{learner.grade}</p>
                      <p className="break-words text-gray-500">
                        Student Number: {learner.studentNumber}
                      </p>
                      {learner.parent && (
                        <p className="text-gray-500">Parent: {learner.parent}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={downloadReport}
                    className="w-full rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87] sm:w-auto"
                  >
                    Download Report
                  </button>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {[
                  { title: "Attendance", value: `${learner.attendance}%`, color: "text-green-600" },
                  { title: "Term Average", value: `${learner.average}%`, color: "text-blue-600" },
                  { title: "Subjects", value: String(subjects.length), color: "text-purple-600" },
                ].map((item) => (
                  <Card key={item.title} className="p-6">
                    <h3 className="text-sm text-gray-500">{item.title}</h3>
                    <p className={`mt-3 text-3xl font-bold sm:text-4xl ${item.color}`}>
                      {item.value}
                    </p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <Heading>Attendance Overview</Heading>
                  <div className="flex justify-center">
                    <div className="flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-green-500">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-green-600">
                          {learner.attendance}%
                        </p>
                        <p className="text-gray-500">Present</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("Attendance")}
                    className="mt-6 w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                  >
                    View Attendance Details
                  </button>
                </Card>

                <Card>
                  <Heading>Notifications</Heading>
                  <div className="space-y-5">
                    {notifications.map((item) => (
                      <div key={item.title} className={`border-l-4 pl-4 ${item.color}`}>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Heading>Subject Performance</Heading>
                  <button
                    type="button"
                    onClick={() => navigate("Results")}
                    className="mb-6 text-left text-sm font-semibold text-[#6B4FA0] hover:underline"
                  >
                    View all results
                  </button>
                </div>

                {subjects.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                    No marks have been captured yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {subjects.map((subject) => (
                      <div key={`${subject.name}-${subject.assessment}`}>
                        <div className="mb-2 flex justify-between gap-3">
                          <span className="font-medium text-gray-700">{subject.name}</span>
                          <span className="font-bold text-[#6B4FA0]">{subject.mark}%</span>
                        </div>
                        <div
                          className="h-3 w-full rounded-full bg-gray-200"
                          role="progressbar"
                          aria-label={`${subject.name} mark`}
                          aria-valuenow={subject.mark}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="h-3 rounded-full bg-[#6B4FA0]"
                            style={{ width: `${Math.min(subject.mark, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <Heading>Recent Results</Heading>
                  {subjects.length === 0 ? (
                    <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                      No results to show yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[430px] text-left">
                        <thead>
                          <tr className="border-b text-sm text-gray-500">
                            <th className="pb-3 pr-4">Subject</th>
                            <th className="pb-3 pr-4">Assessment</th>
                            <th className="pb-3">Mark</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects.slice(0, 4).map((subject) => (
                            <tr
                              key={`${subject.name}-${subject.assessment}`}
                              className="border-b last:border-0"
                            >
                              <td className="py-4 pr-4">{subject.name}</td>
                              <td className="py-4 pr-4">{subject.assessment}</td>
                              <td className="py-4 font-bold text-green-600">{subject.mark}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>

                <Card>
                  <Heading>Quick Actions</Heading>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={downloadReport}
                      className="w-full rounded-xl bg-[#6B4FA0] py-3 text-white hover:bg-[#563c87]"
                    >
                      Download Report
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("Teachers")}
                      className="w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                    >
                      Contact Teacher
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("Calendar")}
                      className="w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                    >
                      School Calendar
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("Timetable")}
                      className="w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                    >
                      View Timetable
                    </button>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <div className="flex items-center justify-between gap-3">
                    <Heading>Upcoming Events</Heading>
                    <button
                      type="button"
                      onClick={() => navigate("Calendar")}
                      className="mb-6 text-sm font-semibold text-[#6B4FA0] hover:underline"
                    >
                      Open Calendar
                    </button>
                  </div>
                  {sortedEvents.length === 0 ? (
                    <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                      No events have been scheduled.
                    </p>
                  ) : (
                    <div className="space-y-5">
                      {sortedEvents.slice(0, 5).map((event) => (
                        <div
                          key={`${event.date}-${event.title}`}
                          className="flex flex-col justify-between gap-2 border-b pb-4 last:border-0 sm:flex-row sm:items-center"
                        >
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(event.date)} • {event.time}
                            </p>
                          </div>
                          <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-sm text-[#6B4FA0]">
                            {event.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                <Card>
                  <Heading>School Announcements</Heading>
                  {announcements.length === 0 ? (
                    <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                      There are no announcements right now.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {announcements.map((item) => (
                        <div key={item.title}>
                          <h3 className="font-semibold text-[#6B4FA0]">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {activeSection === "Calendar" && (
            <div className="space-y-6">
              <Card>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#6B4FA0]">
                      School events
                    </p>
                    <Heading>School Calendar</Heading>
                    <p className="text-sm text-gray-500">
                      Choose a date to see its scheduled events.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("Timetable")}
                    className="rounded-xl bg-[#6B4FA0] px-5 py-3 text-white hover:bg-[#563c87]"
                  >
                    View Timetable
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() =>
                      setCalendarMonth(
                        new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
                      )
                    }
                    className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-[#6B4FA0] hover:bg-purple-50"
                  >
                    ← Previous
                  </button>
                  <h3 className="text-center text-lg font-bold text-gray-800 sm:text-xl">
                    {monthName}
                  </h3>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() =>
                      setCalendarMonth(
                        new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)
                      )
                    }
                    className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-[#6B4FA0] hover:bg-purple-50"
                  >
                    Next →
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-7 gap-1 sm:gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-xs font-bold text-gray-500 sm:text-sm"
                    >
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: firstWeekday }, (_, index) => (
                    <div key={`empty-${index}`} className="min-h-12 rounded-lg sm:min-h-20" />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const key = dateKey(day);
                    const dayEvents = events.filter((event) => event.date === key);
                    const selected = selectedDate === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedDate(key)}
                        aria-pressed={selected}
                        className={`flex min-h-12 min-w-0 flex-col items-center rounded-lg border p-1 text-sm transition sm:min-h-20 sm:p-2 ${
                          selected
                            ? "border-[#6B4FA0] bg-purple-100 font-bold text-[#4F3D97]"
                            : "border-gray-100 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                      >
                        <span>{day}</span>
                        {dayEvents.length > 0 && (
                          <span
                            className="mt-1 h-2 w-2 rounded-full bg-[#6B4FA0]"
                            aria-label={`${dayEvents.length} event(s)`}
                          />
                        )}
                        {dayEvents.length > 0 && (
                          <span className="hidden text-center text-[10px] leading-tight sm:block">
                            {dayEvents[0].title}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <Heading>Events for {formatDate(selectedDate)}</Heading>
                {selectedEvents.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                    No events are scheduled for this date.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedEvents.map((event) => (
                      <div
                        key={`${event.date}-${event.title}`}
                        className="rounded-2xl border border-purple-100 p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                            <p className="mt-1 text-gray-500">{event.time}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              Location: {event.location}
                            </p>
                          </div>
                          <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-sm text-[#6B4FA0]">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeSection === "Timetable" && (
            <div className="space-y-6">
              <Card>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#6B4FA0]">
                  Weekly schedule
                </p>
                <Heading>Class Timetable</Heading>
                <p className="mb-6 text-gray-600">
                  {learner.name} • {learner.grade}
                </p>

                {timetable.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                    A timetable has not been published for this class yet.
                  </p>
                ) : (
                  <>
                    <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {timetable.map(({ day }) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          aria-pressed={selectedDay === day}
                          className={`rounded-xl px-3 py-3 text-sm font-semibold transition sm:text-base ${
                            selectedDay === day
                              ? "bg-[#6B4FA0] text-white"
                              : "border border-gray-200 text-gray-700 hover:bg-purple-50"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {selectedTimetable?.lessons.map((lesson) => (
                        <div
                          key={`${lesson.time}-${lesson.subject}`}
                          className="grid grid-cols-1 gap-2 rounded-2xl border border-gray-100 p-4 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-4"
                        >
                          <div className="font-semibold text-[#6B4FA0]">{lesson.time}</div>
                          <div>
                            <h3 className="font-bold text-gray-800">{lesson.subject}</h3>
                            <p className="text-sm text-gray-500">{lesson.room}</p>
                          </div>
                          <span className="w-fit rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-[#6B4FA0]">
                            Lesson
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => navigate("Calendar")}
                  className="mt-5 w-full rounded-xl border border-[#6B4FA0] px-5 py-3 font-semibold text-[#6B4FA0] hover:bg-purple-50 sm:w-auto"
                >
                  Open School Calendar
                </button>
              </Card>
            </div>
          )}

          {activeSection === "Results" && (
            <div className="space-y-6">
              <Card>
                <Heading>Academic Results</Heading>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-blue-50 p-5">
                    <p className="text-sm text-gray-600">Term Average</p>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                      {learner.average}%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-purple-50 p-5">
                    <p className="text-sm text-gray-600">Subjects Listed</p>
                    <p className="mt-2 text-3xl font-bold text-[#6B4FA0]">
                      {subjects.length}
                    </p>
                  </div>
                </div>

                {subjects.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                    No marks have been captured yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[430px] text-left">
                      <thead>
                        <tr className="border-b text-sm text-gray-500">
                          <th className="pb-3 pr-4">Subject</th>
                          <th className="pb-3 pr-4">Assessment</th>
                          <th className="pb-3">Mark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((s) => (
                          <tr
                            key={`${s.name}-${s.assessment}`}
                            className="border-b last:border-0"
                          >
                            <td className="py-4 pr-4">{s.name}</td>
                            <td className="py-4 pr-4">{s.assessment}</td>
                            <td className="py-4 font-bold text-[#6B4FA0]">{s.mark}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <button
                  type="button"
                  onClick={downloadReport}
                  className="mt-6 rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
                >
                  Download Report
                </button>
              </Card>
            </div>
          )}

          {activeSection === "Attendance" && (
            <Card>
              <Heading>Attendance Overview</Heading>

              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-[14px] border-green-500">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">
                      {learner.attendance}%
                    </p>
                    <p className="text-gray-500">Present</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Attendance Summary
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {learner.name} has an attendance rate of {learner.attendance}%.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {activeSection === "Teachers" && (
            <Card>
              <Heading>Teachers</Heading>
              <p className="mb-6 text-gray-600">
                Use the message form to prepare a message for your learner&apos;s teacher.
              </p>

              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
                <h3 className="font-semibold text-gray-800">
                  Teacher Contact Information
                </h3>
                <p className="mt-2 text-gray-600">
                  Teacher names, email addresses, and phone numbers have not been supplied to this page yet.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("Messages")}
                  className="mt-4 rounded-xl bg-[#6B4FA0] px-5 py-3 text-white hover:bg-[#563c87]"
                >
                  Go to Messages
                </button>
              </div>
            </Card>
          )}

          {activeSection === "Messages" && (
            <div className="space-y-6">
              <Card>
                <Heading>Messages</Heading>
                <p className="mb-6 text-gray-600">
                  Write and keep a local draft message in this page.
                </p>

                <form onSubmit={sendMessage} className="space-y-4">
                  <label htmlFor="message" className="block font-medium text-gray-700">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    value={messageDraft}
                    onChange={(event) => setMessageDraft(event.target.value)}
                    rows={5}
                    placeholder="Type your message here..."
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#6B4FA0] focus:ring-2 focus:ring-purple-100"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
                  >
                    Save Message
                  </button>
                </form>
              </Card>

              <Card>
                <Heading>Saved Messages</Heading>
                {sentMessages.length === 0 ? (
                  <p className="text-gray-500">You have not saved any messages yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {sentMessages.map((message, index) => (
                      <li
                        key={`${index}-${message}`}
                        className="whitespace-pre-wrap rounded-xl border border-gray-200 p-4 text-gray-700"
                      >
                        {message}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          )}

          {activeSection === "Profile" && (
            <Card>
              <Heading>Profile Information</Heading>

              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6B4FA0] text-2xl font-bold text-white">
                  {learner.initials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{learner.name}</h3>
                  <p className="text-gray-500">{learner.grade}</p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-gray-100">
                {[
                  ["Learner Name", learner.name],
                  ["Grade", learner.grade],
                  ["Student Number", learner.studentNumber],
                  ["Parent / Guardian", learner.parent || "Not available"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-2 sm:gap-4"
                  >
                    <dt className="font-medium text-gray-500">{label}</dt>
                    <dd className="break-words text-gray-800">{value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={downloadReport}
                className="mt-6 rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
              >
                Download Learner Report
              </button>
            </Card>
          )}

          <footer className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800">
              SchoolLoop Parent Portal
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Empowering parents through better communication.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              © 2026 SchoolLoop • South Africa 🇿🇦
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}