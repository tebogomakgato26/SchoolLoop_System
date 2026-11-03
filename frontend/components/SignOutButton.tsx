"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { clearSession, getSession } from "@/lib/auth";

export default function SignOutButton() {
  const router = useRouter();

  function handleSignOut() {
    const role = getSession()?.role ?? "teacher";
    clearSession();
    router.replace(`/${role}`);
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/20"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}