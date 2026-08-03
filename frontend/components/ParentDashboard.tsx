"use client";

import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Calendar,
  User,
  Bell,
  ChevronRight,
  BookOpen,
  ClipboardList,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

interface Subject {
  id: number;
  name: string;
  icon: React.ReactNode;
  score: number;
  color: string;
}

interface Student {
  name: string;
  initials: string;
  grade: string;
  attendance: number;
  average: number;
}

type Tab = "home" | "marks" | "exams" | "profile";

interface HeaderProps {
  title: string;
}

interface HomeScreenProps {
  onGoToMarks: () => void;
}

interface PlaceholderProps {
  title: string;
}

const student: Student = {
  name: "Thabo Mokoena",
  initials: "TM",
  grade: "Grade 9A • Term 2",
  attendance: 87,
  average: 71,
};

const subjects: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    icon: <BookOpen size={18} />,
    score: 78,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "English",
    icon: <ClipboardList size={18} />,
    score: 65,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    name: "Science",
    icon: <GraduationCap size={18} />,
    score: 54,
    color: "bg-orange-100 text-orange-600",
  },
];

function Header({ title }: HeaderProps) {
  return (
    <div className="bg-indigo-600 rounded-b-3xl px-5 pt-6 pb-10 text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-indigo-100">
            Good morning, Mrs Mokoena
          </p>

          <h1 className="text-2xl font-bold mt-1">
            {title}
          </h1>
        </div>

        <button className="bg-white/20 p-2 rounded-full">
          <Bell size={18} />
        </button>
      </div>
    </div>
  );
}

function StudentCard() {
  return (
    <div className="mx-4 -mt-8 bg-white rounded-2xl shadow-lg p-5 relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
          {student.initials}
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            {student.name}
          </h2>

          <p className="text-sm text-gray-500">
            {student.grade}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {student.attendance}%
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Attendance
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {student.average}%
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Term Average
          </p>
        </div>
      </div>
    </div>
  );
}
function HomeScreen({ onGoToMarks }: HomeScreenProps) {
  return (
    <div>
      <Header title="Thabo's Progress" />

      <StudentCard />

      <div className="px-4 mt-6">
        <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3">
          SUBJECTS
        </h3>

        <div className="space-y-3">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={onGoToMarks}
              className="w-full bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-4 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${subject.color}`}
                >
                  {subject.icon}
                </div>

                <span className="font-medium text-gray-800">
                  {subject.name}
                </span>
              </div>

              <ChevronRight
                size={18}
                className="text-gray-400"
              />
            </button>
          ))}
        </div>

        <div className="mt-6 bg-indigo-50 rounded-xl p-4">
          <h3 className="font-semibold text-indigo-700">
            Quick Tip
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Tap any subject or open the <b>Marks</b> tab below to
            view your child's academic performance.
          </p>
        </div>
      </div>
    </div>
  );
}
function MarksScreen() {
  return (
    <div>
      <Header title="Marks" />

      <div className="px-4 mt-6">
        <h3 className="text-xs font-semibold text-gray-400 tracking-wider mb-3">
          SUBJECT MARKS
        </h3>

        <div className="space-y-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${subject.color}`}
                  >
                    {subject.icon}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {subject.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      Overall Performance
                    </p>
                  </div>
                </div>

                <span className="text-xl font-bold text-indigo-600">
                  {subject.score}%
                </span>
              </div>

              <div className="mt-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-gray-500">Assignments</p>
                  <p className="font-semibold">
                    {Math.max(subject.score - 3, 50)}%
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-gray-500">Tests</p>
                  <p className="font-semibold">
                    {Math.min(subject.score + 2, 100)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExamsScreen() {
  const exams = [
    {
      subject: "Mathematics",
      date: "30 July 2026",
      time: "09:00",
    },
    {
      subject: "English",
      date: "02 August 2026",
      time: "11:00",
    },
    {
      subject: "Science",
      date: "08 August 2026",
      time: "10:30",
    },
  ];

  return (
    <div>
      <Header title="Upcoming Exams" />

      <div className="px-4 mt-6 space-y-3">
        {exams.map((exam, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <h3 className="font-semibold text-gray-800">
              {exam.subject}
            </h3>

            <p className="text-gray-500 mt-1">
              📅 {exam.date}
            </p>

            <p className="text-gray-500">
              🕒 {exam.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div>
      <Header title="Profile" />

      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">

          <div>
            <p className="text-xs text-gray-500">
              Parent
            </p>
            <h3 className="font-semibold">
              Mrs Mokoena
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Student
            </p>
            <h3 className="font-semibold">
              {student.name}
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Grade
            </p>
            <h3 className="font-semibold">
              {student.grade}
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Email
            </p>
            <h3 className="font-semibold">
              parent@email.com
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Phone
            </p>
            <h3 className="font-semibold">
              +27 71 234 5678
            </h3>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl mt-4 hover:bg-indigo-700">
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
export default function ParentDashboard() {
  const [tab, setTab] = useState<TabId>("home");

  const tabs: TabConfig[] = [
    {
      id: "home",
      label: "Home",
      icon: Home,
    },
    {
      id: "marks",
      label: "Marks",
      icon: BarChart2,
    },
    {
      id: "exams",
      label: "Exams",
      icon: Calendar,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
  ];

  const renderScreen = () => {
    switch (tab) {
      case "home":
        return (
          <HomeScreen
            onGoToMarks={() => setTab("marks")}
          />
        );

      case "marks":
        return <MarksScreen />;

      case "exams":
        return <ExamsScreen />;

      case "profile":
        return <ProfileScreen />;

      default:
        return (
          <HomeScreen
            onGoToMarks={() => setTab("marks")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">

      <div className="w-full max-w-sm bg-white rounded-[35px] shadow-2xl overflow-hidden">

        <div className="min-h-[720px]">
          {renderScreen()}
        </div>

        <nav className="grid grid-cols-4 border-t bg-white">

          {tabs.map(({ id, label, icon: Icon }) => {
            const active = tab === id;

            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`py-3 flex flex-col items-center text-xs transition ${
                  active
                    ? "text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                <Icon size={20} />

                <span className="mt-1">
                  {label}
                </span>
              </button>
            );
          })}

        </nav>
      </div>

    </div>
  );
}