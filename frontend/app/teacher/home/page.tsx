// frontend/app/teacher/home/page.tsx
"use client";

import { ClipboardCheck, NotebookPen, UserPlus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import { getSession, clearSession } from "@/lib/auth";

function TeacherHomeContent() {
  const router = useRouter();
  const session = getSession();

  function handleLogout() {
    clearSession();
    router.push("/teacher");
  }

  const links = [
    {
      href: "/teacher/attendance",
      icon: ClipboardCheck,
      title: "Attendance",
      description: "Mark today's attendance for your classes.",
    },
    {
      href: "/teacher/marks",
      icon: NotebookPen,
      title: "Marks",
      description: "Capture and update assessment scores.",
    },
    {
      href: "/teacher/register",
      icon: UserPlus,
      title: "Register",
      description: "View your class register and learner details.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#E9E9EF] p-4">
      <div className="min-h-[calc(100vh-32px)] rounded-[35px] border border-gray-200 bg-gray-100 shadow-xl">
        <div className="rounded-t-[4px] bg-[#0F766E] px-10 py-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">Teacher Portal</p>
            <h1 className="text-2xl font-bold text-white">
              Welcome back{session ? ", " + session.fullName : ""}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        <div className="px-10 py-12 lg:px-24">
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-[#0F766E] transition-all shadow-sm"
                >
                  <div className="w-11 h-11 bg-[#0F766E] rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{link.title}</h3>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TeacherHomePage() {
  return (
    <RequireAuth role="teacher">
      <TeacherHomeContent />
    </RequireAuth>
  );
}
