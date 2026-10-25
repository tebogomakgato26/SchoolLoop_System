"use client";

import RequireAuth from "@/components/auth/RequireAuth";

export default function ParentPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth role="parent">{children}</RequireAuth>;
}