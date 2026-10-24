// frontend/app/teacher/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye } from "lucide-react";
import { login } from "@/lib/auth";

export default function TeacherPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) return;
    setError(null);
    setLoading(true);
    try {
      const session = await login(email, password);
      if (session.role !== "teacher") {
        setError("This login is for teachers only.");
        return;
      }
      router.push("/teacher/home");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#E9E9EF] p-4">
      <div className="min-h-[calc(100vh-32px)] rounded-[35px] border border-gray-200 bg-gray-100 shadow-xl">
        <div className="rounded-t-[4px] bg-[#0F766E] px-10 py-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#115E59] shadow-xl">
            <span className="text-xl font-bold text-white">SL</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-white">SchoolLoop</h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/90">
            Manage attendance, capture marks, communicate with parents, and help
            learners succeed every day.
          </p>

          <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-semibold text-white">
            <span className="mr-3 h-3 w-3 rounded-full bg-white"></span>
            Teacher Portal
          </div>
        </div>

        <div className="w-full px-10 py-12 lg:px-24">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Sign in to continue to your account
            </p>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div className="mt-10">
              <label className="mb-2 block text-base font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-5 transition focus-within:border-[#0F766E]">
                <Mail className="h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="teacher@schoolloop.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-base outline-none"
                />
              </div>
            </div>

            <div className="mt-7">
              <label className="mb-2 block text-base font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-5 transition focus-within:border-[#0F766E]">
                <Lock className="h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full bg-transparent px-4 py-4 text-base outline-none"
                />
                <Eye
                  onClick={() => setShowPassword((s) => !s)}
                  className="h-5 w-5 cursor-pointer text-gray-400 hover:text-[#0F766E]"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-10 w-full rounded-xl bg-[#0F766E] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#115E59] hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-sm text-gray-500">or continue as</span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            <div className="flex gap-3">
              <a
                href="/principal"
                className="flex-1 text-center rounded-xl border-2 border-[#0F766E] py-4 text-sm font-semibold text-[#0F766E] transition duration-300 hover:bg-[#0F766E] hover:text-white"
              >
                Principal Portal
              </a>
              <a
                href="/parent"
                className="flex-1 text-center rounded-xl border-2 border-[#0F766E] py-4 text-sm font-semibold text-[#0F766E] transition duration-300 hover:bg-[#0F766E] hover:text-white"
              >
                Parent Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}