"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  GraduationCap,
  Shield,
} from "lucide-react";

const roles = {
  parent: {
    name: "Parent Portal",
    color: "#0e4422",
    icon: Users,
    email: "parent@schoolloop.com",
    description:
      "Stay connected with your child's attendance, grades, school notices and communicate with teachers.",
  },

  teacher: {
    name: "Teacher Portal",
    color: "#0F766E",
    icon: GraduationCap,
    email: "teacher@schoolloop.com",
    description:
      "Manage attendance, capture marks, communicate with parents and monitor learner progress.",
  },

  principal: {
    name: "Principal Portal",
    color: "#1E3A8A",
    icon: Shield,
    email: "principal@schoolloop.com",
    description:
      "Monitor school performance, manage teachers, reports and school administration.",
  },
};

export default function LoginPage() {
  const [role, setRole] = useState<keyof typeof roles>("teacher");
  const [showPassword, setShowPassword] = useState(false);

  const current = roles[role];
  const Icon = current.icon;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT SIDE */}
        <div
          className="hidden md:flex flex-col justify-center text-white p-12 transition-all duration-300"
          style={{ backgroundColor: current.color }}
        >
          <h1 className="text-5xl font-bold mb-6">SchoolLoop</h1>

          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>

          <p className="text-lg leading-8 text-white/80">
            {current.description}
          </p>

          <div className="mt-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Icon className="h-10 w-10 text-white" />
            </div>

            <p className="mt-8 text-sm text-white/70">
              © {new Date().getFullYear()} SchoolLoop
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12">
          <h1
            className="text-4xl font-bold text-center"
            style={{ color: current.color }}
          >
            SchoolLoop
          </h1>

          <p className="text-center text-gray-600 mt-3 mb-10 text-lg">
            {current.name}
          </p>

          {/* ROLE SELECTOR */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {Object.entries(roles).map(([key, value]) => {
              const RoleIcon = value.icon;
              const active = role === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRole(key as keyof typeof roles)}
                  className="rounded-xl border-2 py-3 transition duration-300"
                  style={{
                    backgroundColor: active ? value.color : "white",
                    borderColor: value.color,
                    color: active ? "white" : value.color,
                  }}
                >
                  <RoleIcon className="mx-auto mb-2 h-5 w-5" />

                  <span className="text-sm font-semibold">
                    {value.name.replace(" Portal", "")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* LOGIN FORM */}
          <form className="space-y-6"></form>
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-white focus-within:ring-2">
              <Mail className="h-5 w-5 text-gray-400" />

              <input
                type="email"
                placeholder={current.email}
                className="w-full py-3 pl-3 bg-transparent outline-none text-black placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 bg-white focus-within:ring-2">
              <Lock className="h-5 w-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full py-3 pl-3 bg-transparent outline-none text-black placeholder:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* SIGN IN */}
          <button
            type="submit"
            className="w-full py-3 mt-3 rounded-lg text-white font-semibold transition duration-300 hover:opacity-90"
            style={{
              backgroundColor: current.color,
            }}
          >
            Sign In
          </button>

          {/* FORGOT PASSWORD */}
          <div className="text-center mb-4">
            <button
              type="button"
              className="text-sm font-medium hover:underline"
              style={{
                color: current.color,
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="text-sm text-gray-500">or</span>

            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* CREATE ACCOUNT */}
          <button
            type="button"
            className="w-full py-3 rounded-lg border-2 font-semibold transition duration-300 mb-4"
            style={{
              borderColor: current.color,
              color: current.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = current.color;
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = current.color;
            }}
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Signing in as{" "}
            <span className="font-semibold" style={{ color: current.color }}>
              {current.name}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
