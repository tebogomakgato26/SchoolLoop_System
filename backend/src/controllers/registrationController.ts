// src/controllers/registrationController.ts

import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import { Parent } from "../models/Parent";
import { Learner } from "../models/Learner";

// GET /api/principal/parents/search?q=...
export async function searchParents(req: Request, res: Response) {
  try {
    const q = String(req.query.q || "").trim();
    if (q.length < 2) return res.json([]);

    const parents = await Parent.findAll({
      where: {
        [Op.or]: [
          { fullName: { [Op.like]: `%${q}%` } },
          { phoneNumber: { [Op.like]: `%${q}%` } },
          { idNumber: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [{ model: Learner, as: "learners", attributes: ["fullName"] }],
      limit: 10,
    });

    res.json(
      parents.map((p) => ({
        id: p.id,
        fullName: p.fullName,
        phoneNumber: p.phoneNumber,
        idNumber: p.idNumber,
        relationship: p.relationship,
        learners: (p as any).learners?.map((l: Learner) => ({ fullName: l.fullName })) || [],
      }))
    );
  } catch (error) {
    console.error("searchParents error:", error);
    res.status(500).json({ message: "Search failed." });
  }
}

// POST /api/principal/learners/register
// Body: { learner, parentId? , newParent? }
export async function registerLearner(req: Request, res: Response) {
  try {
    const { learner, parentId, newParent } = req.body;

    if (!learner || !learner.fullName || !learner.dateOfBirth || !learner.grade || !learner.admissionNumber) {
      return res.status(400).json({ message: "Learner details are incomplete." });
    }

    let resolvedParentId = parentId;

    if (!resolvedParentId) {
      if (!newParent || !newParent.fullName || !newParent.idNumber) {
        return res.status(400).json({
          message: "Select an existing parent or provide new parent details.",
        });
      }

      const existing = await Parent.findOne({ where: { idNumber: newParent.idNumber } });
      if (existing) {
        // A parent with this ID number already exists - link to them
        // instead of creating a duplicate.
        resolvedParentId = existing.id;
      } else {
        // Initial login for a newly registered parent is their own ID
        // number, hashed - the same convention the seed script uses for
        // backfilling existing parents. They can change it later once a
        // "change password" flow exists.
        const passwordHash = await bcrypt.hash(newParent.idNumber, 10);

        const created = await Parent.create({
          fullName: newParent.fullName,
          phoneNumber: newParent.phoneNumber,
          idNumber: newParent.idNumber,
          email: newParent.email || null,
          relationship: newParent.relationship,
          passwordHash,
        });
        resolvedParentId = created.id;
      }
    }

    const createdLearner = await Learner.create({
      fullName: learner.fullName,
      dateOfBirth: learner.dateOfBirth,
      gender: learner.gender,
      grade: learner.grade,
      className: learner.className || null,
      admissionNumber: learner.admissionNumber,
      parentId: resolvedParentId,
    });

    res.status(201).json({
      message: "Learner registered successfully.",
      learnerId: createdLearner.id,
      parentId: resolvedParentId,
    });
  } catch (error: any) {
    console.error("registerLearner error:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "A learner with that admission number already exists.",
      });
    }
    res.status(500).json({ message: "Registration failed." });
  }
}
