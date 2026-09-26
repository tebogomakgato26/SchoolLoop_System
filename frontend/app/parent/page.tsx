// frontend/app/parent/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye } from "lucide-react";
import { login } from "@/lib/auth";

export default function ParentPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!identifier || !password) return;
    setError(null);
    setLoading(true);
    try {
      const session = await login(identifier, password);
      if (session.role !== "parent") {
        setError("This login is for parents only.");
        return;
      }
      router.push("/parent/portal");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#E9E9EF] p-4">
      {/* Outer Frame */}
      <div className="min-h-[calc(100vh-32px)] rounded-[35px] border border-gray-200 bg-gray-100 shadow-xl">
        {/* ================= HEADER ================= */}

        <div className="rounded-t-[4px] bg-[#6C5CE7] px-10 py-8 text-center">
          {/* Logo */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5848D8] shadow-xl">
            <span className="text-xl font-bold text-white">SL</span>
          </div>

          {/* Title */}

          <h1 className="mt-3 text-3xl font-bold text-white">SchoolLoop</h1>

          {/* Subtitle */}

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/90">
            Stay connected to your child's academic journey. Track attendance,
            monitor performance, receive announcements, and communicate with
            teachers anytime.
          </p>

          {/* Badge */}

          <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-6 py-2 text-sm font-semibold text-white">
            <span className="mr-3 h-3 w-3 rounded-full bg-white"></span>
            Parent Portal
          </div>
        </div>

        {/* ================= FORM ================= */}

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

            {/* Identifier - ID number or phone, not email, since that is what
                the registration flow actually collects from parents */}

            <div className="mt-10">
              <label className="mb-2 block text-base font-medium text-gray-700">
                ID Number or Phone Number
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-5 transition focus-within:border-[#6C5CE7]">
                <Mail className="h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="e.g. 8501015800089"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-base outline-none"
                />
              </div>
            </div>

            {/* Password */}

            <div className="mt-7">
              <label className="mb-2 block text-base font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 px-5 transition focus-within:border-[#6C5CE7]">
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
                  className="h-5 w-5 cursor-pointer text-gray-400 hover:text-[#6C5CE7]"
                />
              </div>
            </div>

            {/* Sign In Button */}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-10 w-full rounded-xl bg-[#6C5CE7] py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#5848D8] hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Forgot Password */}

            <div className="mt-5 text-center">
              <button className="text-base font-medium text-[#6C5CE7] hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Divider */}

            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm text-gray-500">or continue as</span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Teacher Portal */}

            <a
              href="/teacher"
              className="block text-center w-full rounded-xl border-2 border-[#6C5CE7] py-4 text-lg font-semibold text-[#6C5CE7] transition duration-300 hover:bg-[#6C5CE7] hover:text-white"
            >
              Teacher Portal
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
