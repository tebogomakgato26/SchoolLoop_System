// src/middleware/auth.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type Role = "principal" | "teacher" | "parent";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

// Reads "Authorization: Bearer <token>", verifies it, and attaches the
// decoded { id, role } to req.user for downstream handlers.
export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided." });
  }

  const token = header.slice("Bearer ".length);

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      // Fail loudly in development rather than silently accepting
      // unsigned tokens - a missing secret is a setup mistake, not a
      // normal runtime condition.
      throw new Error("JWT_SECRET is not set in the environment.");
    }

    const decoded = jwt.verify(token, secret) as { id: string; role: Role };
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
}

// Use after verifyToken. Only lets the request through if the logged in
// user's role is one of the allowed roles for that route.
export function requireRole(...allowedRoles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized for this action." });
    }
    next();
  };
}
