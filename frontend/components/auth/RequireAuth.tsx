// frontend/components/auth/RequireAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, Role } from "@/lib/auth";

const LOGIN_PATH: Record<Role, string> = {
  principal: "/principal",
  teacher: "/teacher",
  parent: "/parent",
};

export default function RequireAuth({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== role) {
      router.replace(LOGIN_PATH[role]);
      return;
    }
    setChecked(true);
  }, [role, router]);

  // Renders nothing until the check completes, so a protected page never
  // flashes real content before redirecting an unauthenticated visitor.
  if (!checked) return null;

  return <>{children}</>;
}
