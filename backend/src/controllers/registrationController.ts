// src/controllers/registrationController.ts

import { Request, Response } from "express";
import { Op } from "sequelize";
import { Parent } from "../models/Parent";
import { Learner } from "../models/Learner";

// GET /api/principal/parents/search?q=...
// Used when the principal is registering a learner and wants to check
// whether the parent already exists (so they don't create a duplicate).
export async function searchParents(req: Request, res: Response) {
  try {
    const query = String(req.query.q || "").trim();

    if (query.length < 2) {
      return res.json([]); // avoid matching everything on a 1-character query
    }

    const parents = await Parent.findAll({
      where: {
        [Op.or]: [
          { fullName: { [Op.like]: `%${query}%` } },
          { phoneNumber: { [Op.like]: `%${query}%` } },
          { idNumber: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [{ model: Learner, as: "learners", attributes: ["id", "fullName", "grade"] }],
      limit: 10,
    });

    res.json(parents);
  } catch (error) {
    console.error("searchParents error:", error);
    res.status(500).json({ message: "Failed to search parents." });
  }
}

// POST /api/principal/learners/register
//
// Body shape:
// {
//   learner: { fullName, dateOfBirth, gender, grade, className, admissionNumber },
//   parentId?: string        // provide this if linking to an EXISTING parent
//   newParent?: {             // provide this if registering a NEW parent
//     fullName, phoneNumber, email, idNumber, relationship
//   }
// }
//
// Exactly one of parentId / newParent should be provided.
export async function registerLearner(req: Request, res: Response) {
  try {
    const { learner, parentId, newParent } = req.body;

    if (!learner) {
      return res.status(400).json({ message: "Learner details are required." });
    }

    if (!parentId && !newParent) {
      return res.status(400).json({
        message: "Provide either an existing parentId or newParent details.",
      });
    }

    let resolvedParentId = parentId;

    // If registering a brand-new parent, check for a duplicate ID number first
    if (newParent) {
      const existing = await Parent.findOne({
        where: { idNumber: newParent.idNumber },
      });

      if (existing) {
        return res.status(409).json({
          message:
            "A parent with this ID number already exists. Search for them instead of creating a duplicate.",
          existingParentId: existing.id,
        });
      }

      const createdParent = await Parent.create(newParent);
      resolvedParentId = createdParent.id;
    }

    const createdLearner = await Learner.create({
      ...learner,
      parentId: resolvedParentId,
    });

    const learnerWithParent = await Learner.findByPk(createdLearner.id, {
      include: [{ model: Parent, as: "parent" }],
    });

    res.status(201).json(learnerWithParent);
  } catch (error) {
    console.error("registerLearner error:", error);
    res.status(500).json({ message: "Failed to register learner." });
  }
}
