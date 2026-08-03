"use client";
import { useState } from "react";

export default function ParentSignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm overflow-hidden">

        {/* ── TOP HEADER ── */}
        <div className="bg-[#6B4FA0] px-8 pt-10 pb-8 flex flex-col items-center text-center">
          {/* Logo circle */}
          <div className="w-16 h-16 bg-[#5A3E8A] rounded-2xl flex items-center justify-center mb-4 shadow-md">
            <span className="text-white text-xl font-bold">SL</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">SchoolLoop</h1>
          <p className="text-purple-200 text-sm mb-5">
            Stay connected to your child&apos;s journey
          </p>
          {/* Portal badge */}
          <div className="flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Parent Portal
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="px-8 py-8">

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-[#6B4FA0] transition-colors">
              <input
                type="email"
                placeholder="parent@gmail.com"
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-[#6B4FA0] transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-gray-700 transition-colors mb-4">
            Sign In
          </button>

          {/* Forgot Password */}
          <div className="text-center mb-6">
            <button className="text-sm text-[#6B4FA0] font-medium hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">or continue as</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Continue as Teacher */}
          <button className="w-full border border-gray-200 text-gray-600 text-sm font-medium py-3 rounded-xl hover:border-[#6B4FA0] hover:text-[#6B4FA0] transition-colors">
            Teacher
          </button>

        </div>
      </div>
    </main>
  );
}