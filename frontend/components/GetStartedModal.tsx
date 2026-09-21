"use client";

import { useState } from "react";
import Link from "next/link";

const roleOptions = [
  {
    key: "parent",
    label: "Parent",
    description: "Track grades, attendance & talk to teachers",
    href: "/parent/register",
    color: "#0F6E56",
  },
  {
    key: "teacher",
    label: "Teacher",
    description: "Manage classes, marks & learner progress",
    href: "/teacher/register",
    color: "#185FA5",
  },
];

export default function GetStartedModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-white bg-[#0F6E56] px-5 py-2 rounded-full hover:bg-[#1A8F70] transition-colors"
      >
        Get started
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Choose the role that applies to you
            </p>

            <div className="flex flex-col gap-3">
              {roleOptions.map((role) => (
                <Link
                  key={role.key}
                  href={role.href}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-current transition-colors"
                  style={{ color: role.color }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: role.color }}
                  >
                    <span className="text-white font-bold">
                      {role.label[0]}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {role.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {role.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
