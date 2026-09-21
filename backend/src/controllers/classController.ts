// src/controllers/classController.ts

import { Request, Response } from "express";
import { Class } from "../models/Class";

// GET /api/classes
//
// Note: not filtered by teacher yet, since teacher accounts/auth don't
// exist. Once they do, add a teacherId FK on Class (or a join table if
// a teacher can teach multiple classes) and filter this by the logged-in
// teacher's id instead of returning everything.
export async function getAllClasses(_req: Request, res: Response) {
  try {
    const classes = await Class.findAll({ order: [["grade", "ASC"], ["className", "ASC"]] });
    res.json(classes);
  } catch (error) {
    console.error("getAllClasses error:", error);
    res.status(500).json({ message: "Failed to load classes." });
  }
}
