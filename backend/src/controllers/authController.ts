// src/controllers/authController.ts

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Principal } from "../models/Principal";
import { Teacher } from "../models/Teacher";
import { Parent } from "../models/Parent";

const TOKEN_EXPIRY = "8h";

function signToken(id: string, role: "principal" | "teacher" | "parent") {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set in the environment.");
  return jwt.sign({ id, role }, secret, { expiresIn: TOKEN_EXPIRY });
}

// POST /api/auth/login
// Body: { identifier, password }
//
// One shared login for all three portals. "identifier" is an email for
// Principal and Teacher, or an ID number / phone number for Parent. The
// three tables are checked in turn; whichever one matches decides the
// role, so the frontend does not need to ask "which portal are you
// logging into" separately.
export async function login(req: Request, res: Response) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "identifier and password are required." });
    }

    // 1. Principal
    const principal = await Principal.findOne({ where: { email: identifier } });
    if (principal) {
      const valid = await bcrypt.compare(password, principal.passwordHash);
      if (!valid) return res.status(401).json({ message: "Incorrect password." });
      const token = signToken(principal.id, "principal");
      return res.json({
        token,
        role: "principal",
        fullName: principal.fullName,
        schoolName: principal.schoolName,
      });
    }

    // 2. Teacher
    const teacher = await Teacher.findOne({ where: { email: identifier } });
    if (teacher) {
      const valid = await bcrypt.compare(password, teacher.passwordHash);
      if (!valid) return res.status(401).json({ message: "Incorrect password." });
      const token = signToken(teacher.id, "teacher");
      return res.json({ token, role: "teacher", fullName: teacher.fullName });
    }

    // 3. Parent - by ID number or phone number
    const parent = await Parent.findOne({
      where: { [Op.or]: [{ idNumber: identifier }, { phoneNumber: identifier }] },
    });
    if (parent) {
      if (!parent.passwordHash) {
        return res.status(401).json({
          message: "This account has not been set up for login yet. Contact the school office.",
        });
      }
      const valid = await bcrypt.compare(password, parent.passwordHash);
      if (!valid) return res.status(401).json({ message: "Incorrect password." });
      const token = signToken(parent.id, "parent");
      return res.json({ token, role: "parent", fullName: parent.fullName });
    }

    // Nothing matched any of the three tables.
    res.status(401).json({ message: "No account found for that identifier." });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
}
