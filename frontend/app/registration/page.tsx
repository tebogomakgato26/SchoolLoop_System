"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, GraduationCap, Shield } from "lucide-react";

const roles = {
  parent: { label: "Parent", color: "#0F6E56" },
  teacher: { label: "Teacher", color: "#185FA5" },
  principal: { label: "Principal", color: "#3C3489" },
};

export default function RegistrationPage() {
  const [role, setRole] = useState<keyof typeof roles>("parent");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    schoolCode: "",
    childName: "",
    childGrade: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save the user data to localStorage based on their role
    const userInfo = {
      name: form.fullName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      childName: form.childName,
      childGrade: form.childGrade,
    };
    
    // Saves to "schoolLoopParent", "schoolLoopTeacher", etc.
    localStorage.setItem(`schoolLoop${role.charAt(0).toUpperCase() + role.slice(1)}`, JSON.stringify(userInfo));

    alert("Account created successfully! You can now sign in.");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-6 sm:p-10 border-t-4" style={{ borderTopColor: roles[role].color }}>
        
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-700">
          ← Back to home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mt-6">
          Create an Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2 mb-8">
          Join SchoolLoop to manage or monitor your school journey.
        </p>

        {/* ROLE SELECTOR */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {Object.entries(roles).map(([key, value]) => {
            const active = role === key;
            const Icon = key === "parent" ? Users : key === "teacher" ? GraduationCap : Shield;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key as keyof typeof roles)}
                className="rounded-xl border-2 py-3 transition duration-300 flex flex-col items-center"
                style={{
                  backgroundColor: active ? value.color : "white",
                  borderColor: value.color,
                  color: active ? "white" : value.color,
                }}
              >
                <Icon className="mb-2 h-5 w-5" />
                <span className="text-sm font-semibold">{value.label}</span>
              </button>
            );
          })}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="Min 8 characters"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. 082 123 4567"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Home Address</label>
            <input
              type="text"
              required
              placeholder="123 Main Street, City"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-gray-50 focus:bg-white transition"
            />
          </div>

          {/* PARENT SPECIFIC FIELDS */}
          {role === "parent" && (
            <div className="bg-[#F4F1FB] p-5 rounded-2xl border border-purple-100 mt-6 space-y-4">
              <h3 className="font-bold text-[#6B4FA0] mb-1">Learner Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child's Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yamkela Mgcubhe"
                    value={form.childName}
                    onChange={(e) => updateField("childName", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child's Grade</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9A"
                    value={form.childGrade}
                    onChange={(e) => updateField("childGrade", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6B4FA0] bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TEACHER/PRINCIPAL SPECIFIC FIELDS */}
          {role !== "parent" && (
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {role === "teacher" ? "Staff Invite Code" : "School Name"}
              </label>
              <input
                type="text"
                required
                placeholder={role === "teacher" ? "e.g. STAFF-8842" : "e.g. Rosebank High School"}
                value={form.schoolCode}
                onChange={(e) => updateField("schoolCode", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full text-white py-4 rounded-2xl text-base font-semibold transition hover:opacity-90 shadow-md mt-6"
            style={{ backgroundColor: roles[role].color }}
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: roles[role].color }}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}