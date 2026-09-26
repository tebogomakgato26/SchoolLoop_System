// frontend/lib/auth.ts

export type Role = "teacher" | "principal" | "parent";

export interface Session {
  token: string;
  role: Role;
  fullName: string;
}

const STORAGE_KEY = "schoolloop_session";

export function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Attach the current token to a fetch call automatically.
export async function authFetch(path: string, options: RequestInit = {}) {
  const session = getSession();
  return fetch(process.env.NEXT_PUBLIC_API_URL + path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(session ? { Authorization: "Bearer " + session.token } : {}),
    },
  });
}

// Calls the shared login endpoint. Throws with the server's message on
// failure so the calling page can show it directly.
//
// "identifier" is deliberately not called "email": Principal and Teacher
// log in with email, but Parent logs in with their ID number or phone
// number, since that is what the registration flow actually collects.
export async function login(identifier: string, password: string): Promise<Session> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed.");
  }

  const session: Session = { token: data.token, role: data.role, fullName: data.fullName };
  saveSession(session);
  return session;
}
