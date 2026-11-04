"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const portals = [
    {
      name: "Parent Portal",
      description:
        "Track your child's grades, attendance, and stay in touch with teachers.",
      href: "/login?role=parent",
      bg: "bg-[#E1F5EE]",
      hoverBorder: "hover:border-[#0F6E56]",
      iconBg: "bg-[#0F6E56]",
      linkColor: "text-[#0F6E56]",
      label: "Sign in as Parent",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      name: "Teacher Portal",
      description:
        "Manage your classes, capture grades, and monitor learner progress.",
      href: "/login?role=teacher",
      bg: "bg-[#E6F1FB]",
      hoverBorder: "hover:border-[#185FA5]",
      iconBg: "bg-[#185FA5]",
      linkColor: "text-[#185FA5]",
      label: "Sign in as Teacher",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      name: "Principal Portal",
      description:
        "Full school overview — staff, reports, incidents, and approvals.",
      href: "/login?role=principal",
      bg: "bg-[#EEEDFE]",
      hoverBorder: "hover:border-[#3C3489]",
      iconBg: "bg-[#3C3489]",
      linkColor: "text-[#3C3489]",
      label: "Sign in as Principal",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white relative">

      {/* ── CUSTOM MODAL (Built directly into the page) ── */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center px-4 py-8 backdrop-blur-sm transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative animate-[fadeIn_0.2s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 text-center mt-2">
              Get Started
            </h2>
            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              Create a new account or sign in to your existing portal.
            </p>

            <div className="space-y-3">
              <Link
                href="/registration"
                className="block w-full text-center bg-[#0F6E56] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1A8F70] transition"
              >
                Register as New User
              </Link>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <Link
                href="/login"
                className="block w-full text-center bg-gray-100 text-gray-800 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Sign In to Portal
              </Link>
            </div>
          </div>
        </div>
      )}
  
      {/* ── NAV ── */}
      <nav className="flex justify-between items-center px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0F6E56] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">SchoolLoop</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/registration"
            className="text-sm bg-[#0F6E56] text-white px-4 sm:px-5 py-2 rounded-full hover:bg-[#1A8F70] transition-colors font-medium"
          >
            Register
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="text-center px-4 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#E1F5EE] text-[#0F6E56] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 sm:mb-8">
          South African schools
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-4 sm:mb-6">
          Welcome to <span className="text-[#0F6E56]">SchoolLoop</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto">
          Connecting Principals, Teachers, and Parents in one smart system.
          Real-time grades, attendance, and communication — all in one place.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#portals"
            className="bg-[#0F6E56] text-white text-sm font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-[#1A8F70] transition-colors shadow-lg shadow-green-900/20"
          >
            Choose your portal
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 text-sm font-medium px-6 sm:px-7 py-3 rounded-full border border-gray-200 hover:border-[#0F6E56] hover:text-[#0F6E56] transition-colors"
          >
            Learn more
          </a>
        </div>
      </section>

      {/* ── PORTALS ── */}
      <section id="portals" className="px-4 sm:px-8 py-12 sm:py-16 max-w-5xl mx-auto scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
          Choose your portal
        </h2>
        <p className="text-gray-400 text-center text-sm mb-8 sm:mb-10">
          Select the role that applies to you
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {portals.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className={`${p.bg} rounded-2xl p-6 sm:p-7 border-2 border-transparent ${p.hoverBorder} transition-all cursor-pointer group block`}
            >
              <div className={`w-12 h-12 ${p.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                {p.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {p.name}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {p.description}
              </p>

              <span className={`text-sm font-semibold ${p.linkColor} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                {p.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-gray-50 px-4 sm:px-8 py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              How SchoolLoop Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A unified platform designed to bridge the gap between the classroom and the living room. Here is how our three portals work together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-[#E1F5EE] text-[#0F6E56] rounded-lg flex items-center justify-center mb-4 font-bold text-lg">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Teachers Input Data</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Teachers mark the daily register and capture test marks directly from their portal.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-[#E6F1FB] text-[#185FA5] rounded-lg flex items-center justify-center mb-4 font-bold text-lg">2</div>
              <h3 className="font-bold text-gray-900 mb-2">System Syncs Instantly</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our secure backend immediately processes the data, ensuring everything is up-to-date.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-[#EEEDFE] text-[#3C3489] rounded-lg flex items-center justify-center mb-4 font-bold text-lg">3</div>
              <h3 className="font-bold text-gray-900 mb-2">Parents Stay Informed</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Parents log in to see real-time attendance, report cards, and school announcements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 QUICK STATS ── */}
      <section className="bg-gray-900 py-10 sm:py-12 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {[
            { num: "1 240", label: "Learners" },
            { num: "87%", label: "Attendance rate" },
            { num: "3", label: "Portals" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1">{s.num}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-4 sm:px-8 py-6 sm:py-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0F6E56] rounded-lg flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900">SchoolLoop</span>
        </Link>

        <p className="text-xs text-gray-400 text-center sm:text-right">
          © 2026 SchoolLoop · Built for South African schools 🇿🇦
        </p>
      </footer>

    </main>
  );
}