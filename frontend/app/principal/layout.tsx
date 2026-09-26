// frontend/app/principal/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/principal/Sidebar";
import RequireAuth from "@/components/auth/RequireAuth";

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // "/principal" itself is the login screen, not a dashboard page - it
  // gets its own full-page design, no Sidebar, and no auth check (that
  // would be a redirect loop: not logged in -> redirect to login ->
  // login page checks auth -> redirects to itself).
  if (pathname === "/principal") {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <RequireAuth role="principal">
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </RequireAuth>
  );
}
