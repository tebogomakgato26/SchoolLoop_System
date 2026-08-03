export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── NAV ── */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0F6E56] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">SchoolLoop</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-4 py-2">
            Sign in
          </button>
          <a href="#portals" className="text-sm font-medium text-white bg-[#0F6E56] px-5 py-2 rounded-full hover:bg-[#1A8F70] transition-colors">
            Get started
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="text-center px-8 pt-24 pb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#E1F5EE] text-[#0F6E56] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
          South African schools
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
          Welcome to{" "}
          <span className="text-[#0F6E56]">SchoolLoop</span>
        </h1>

        <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
          Connecting Principals, Teachers, and Parents in one smart system. Real-time grades, attendance, and communication — all in one place.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a href="#portals" className="bg-[#0F6E56] text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-[#1A8F70] transition-colors shadow-lg shadow-green-900/20">
            Choose your portal
          </a>
          <a href="#how" className="text-gray-600 text-sm font-medium px-7 py-3 rounded-full border border-gray-200 hover:border-[#0F6E56] hover:text-[#0F6E56] transition-colors">
            Learn more
          </a>
        </div>
      </section>

      {/* ── PORTALS ── */}
      <section id="portals" className="px-8 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Choose your portal</h2>
        <p className="text-gray-400 text-center text-sm mb-10">Select the role that applies to you</p>

        <div className="grid md:grid-cols-3 gap-5">

          {/* Parent */}
          <div className="bg-[#E1F5EE] rounded-2xl p-7 border-2 border-transparent hover:border-[#0F6E56] transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-[#0F6E56] rounded-xl flex items-center justify-center mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Parent Portal</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Track your child&apos;s grades, attendance, and stay in touch with teachers.
            </p>
            <button className="text-sm font-semibold text-[#0F6E56] flex items-center gap-1 group-hover:gap-2 transition-all">
              Sign in as Parent
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Teacher */}
          <div className="bg-[#E6F1FB] rounded-2xl p-7 border-2 border-transparent hover:border-[#185FA5] transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-[#185FA5] rounded-xl flex items-center justify-center mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Teacher Portal</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Manage your classes, capture grades, and monitor learner progress.
            </p>
            <button className="text-sm font-semibold text-[#185FA5] flex items-center gap-1 group-hover:gap-2 transition-all">
  Sign in as Teacher
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
</button>
</div>

{/* Principal */}
<div className="bg-[#EEEDFE] rounded-2xl p-7 border-2 border-transparent hover:border-[#3C3489] transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-[#3C3489] rounded-xl flex items-center justify-center mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Principal Portal</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              Full school overview — staff, reports, incidents, and approvals.
            </p>
            <button className="text-sm font-semibold text-[#3C3489] flex items-center gap-1 group-hover:gap-2 transition-all">
              Sign in as Principal
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* ── 3 QUICK STATS ── */}
      <section className="bg-gray-900 py-12 px-8">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: "1 240", label: "Learners" },
            { num: "87%",   label: "Attendance rate" },
            { num: "3",     label: "Portals" },
          ].map((s, i) => ( 
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-1">{s.num}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 py-8 border-t border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#0F6E56] rounded-lg flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900">SchoolLoop</span>
        </div>
        <p className="text-xs text-gray-400">© 2026 SchoolLoop · Built for South African schools 🇿🇦</p>
      </footer>

    </main>
  );
}
  