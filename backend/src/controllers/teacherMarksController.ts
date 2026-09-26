// src/controllers/teacherMarksController.ts

import { Request, Response } from "express";
import { Assessment } from "../models/Assessment";
import { Mark } from "../models/Mark";
import { Learner } from "../models/Learner";
import { Enrollment } from "../models/Enrollment";

// GET /api/marks/class/:classId/assessments
export async function getAssessmentsForClass(req: Request, res: Response) {
  try {
    const { classId } = req.params;
    const assessments = await Assessment.findAll({
      where: { classId },
      order: [["date", "DESC"]],
    });
    res.json(assessments);
  } catch (error) {
    console.error("getAssessmentsForClass error:", error);
    res.status(500).json({ message: "Failed to load assessments." });
  }
}

// POST /api/marks/assessments
// Body: { classId, title, totalMarks, date }
export async function createAssessment(req: Request, res: Response) {
  try {
    const { classId, title, totalMarks, date } = req.body;

    if (!classId || !title || !totalMarks || !date) {
      return res.status(400).json({
        message: "classId, title, totalMarks, and date are all required.",
      });
    }

    const assessment = await Assessment.create({ classId, title, totalMarks, date });
    res.status(201).json(assessment);
  } catch (error) {
    console.error("createAssessment error:", error);
    res.status(500).json({ message: "Failed to create assessment." });
  }
}

// GET /api/marks/assessment/:assessmentId/roster
//
// Returns every learner ENROLLED in the assessment's class (via
// Enrollment, not the old Learner.classId), with their score if already
// entered, or null.
export async function getMarksRoster(req: Request, res: Response) {
  try {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findByPk(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found." });
    }

    const enrollments = await Enrollment.findAll({ where: { classId: assessment.classId } });
    const learnerIds = enrollments.map((e) => e.learnerId);

    const learners = await Learner.findAll({
      where: { id: learnerIds },
      order: [["fullName", "ASC"]],
    });

    const existingMarks = await Mark.findAll({ where: { assessmentId } });
    const scoreByLearnerId = new Map(existingMarks.map((m) => [m.learnerId, m.score]));

    const roster = learners.map((l) => ({
      learnerId: l.id,
      fullName: l.fullName,
      admissionNumber: l.admissionNumber,
      score: scoreByLearnerId.get(l.id) ?? null,
    }));

    res.json({ totalMarks: assessment.totalMarks, roster });
  } catch (error) {
    console.error("getMarksRoster error:", error);
    res.status(500).json({ message: "Failed to load marks roster." });
  }
}

// POST /api/marks/submit
// Body: { assessmentId, records: [{ learnerId, score }, ...] }
export async function submitMarks(req: Request, res: Response) {
  try {
    const { assessmentId, records } = req.body;

    if (!assessmentId || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({
        message: "assessmentId and a non-empty records array are required.",
      });
    }

    const assessment = await Assessment.findByPk(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found." });
    }

    const invalid = records.find(
      (r: { score: number }) => r.score < 0 || r.score > assessment.totalMarks
    );
    if (invalid) {
      return res.status(400).json({
        message: `Scores must be between 0 and ${assessment.totalMarks}.`,
      });
    }

    await Promise.all(
      records.map((r: { learnerId: string; score: number }) =>
        Mark.upsert({ assessmentId, learnerId: r.learnerId, score: r.score })
      )
    );

    res.json({ message: `Marks saved for ${records.length} learner(s).` });
  } catch (error) {
    console.error("submitMarks error:", error);
    res.status(500).json({ message: "Failed to save marks." });
  }
}