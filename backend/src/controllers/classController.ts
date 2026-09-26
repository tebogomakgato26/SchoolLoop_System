// src/controllers/classController.ts

import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { Class } from "../models/Class";

// GET /api/classes
//
// Now that Teacher accounts exist, this returns only the classes
// belonging to the logged in teacher (req.user.id, set by verifyToken),
// instead of every class in the school.
export async function getAllClasses(req: AuthenticatedRequest, res: Response) {
  try {
    const classes = await Class.findAll({
      where: { teacherId: req.user!.id },
      order: [["grade", "ASC"], ["className", "ASC"]],
    });
    res.json(classes);
  } catch (error) {
    console.error("getAllClasses error:", error);
    res.status(500).json({ message: "Failed to load classes." });
  }
}
