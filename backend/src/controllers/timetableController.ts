// src/controllers/timetableController.ts

import { Request, Response } from "express";
import { ExamTimetable } from "../models/ExamTimetable";

function formatEntry(entry: ExamTimetable) {
  return {
    id: entry.id,
    subject: entry.subject,
    grade: entry.grade,
    date: entry.date,
    time: entry.time,
    venue: entry.venue,
    status: entry.status,
  };
}

// GET /api/principal/timetable
// The principal sees everything, drafts included.
export async function getTimetable(_req: Request, res: Response) {
  try {
    const entries = await ExamTimetable.findAll({ order: [["date", "ASC"]] });
    res.json(entries.map(formatEntry));
  } catch (error) {
    console.error("getTimetable error:", error);
    res.status(500).json({ message: "Failed to load exam timetable." });
  }
}

// GET /api/timetable
// Parents and teachers only ever see published entries. This is the whole
// point of the draft status: the principal can build the schedule over
// several sittings without half finished information reaching parents.
export async function getPublishedTimetable(_req: Request, res: Response) {
  try {
    const entries = await ExamTimetable.findAll({
      where: { status: "published" },
      order: [["date", "ASC"]],
    });
    res.json(entries.map(formatEntry));
  } catch (error) {
    console.error("getPublishedTimetable error:", error);
    res.status(500).json({ message: "Failed to load exam timetable." });
  }
}

// POST /api/principal/timetable
// Body: { subject, grade, date, time, venue }
export async function createTimetableEntry(req: Request, res: Response) {
  try {
    const { subject, grade, date, time, venue } = req.body;

    if (!subject || !grade || !date || !time || !venue) {
      return res.status(400).json({
        message: "subject, grade, date, time and venue are all required.",
      });
    }

    const entry = await ExamTimetable.create({
      subject,
      grade,
      date,
      time,
      venue,
      status: "draft",
    });

    res.status(201).json(formatEntry(entry));
  } catch (error) {
    console.error("createTimetableEntry error:", error);
    res.status(500).json({ message: "Failed to create timetable entry." });
  }
}

// PUT /api/principal/timetable/:id
// Partial update. Only the fields present in the body are changed.
export async function updateTimetableEntry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const entry = await ExamTimetable.findByPk(id);

    if (!entry) {
      return res.status(404).json({ message: "Timetable entry not found." });
    }

    const { subject, grade, date, time, venue, status } = req.body;
    await entry.update({
      ...(subject !== undefined ? { subject } : {}),
      ...(grade !== undefined ? { grade } : {}),
      ...(date !== undefined ? { date } : {}),
      ...(time !== undefined ? { time } : {}),
      ...(venue !== undefined ? { venue } : {}),
      ...(status !== undefined ? { status } : {}),
    });

    res.json(formatEntry(entry));
  } catch (error) {
    console.error("updateTimetableEntry error:", error);
    res.status(500).json({ message: "Failed to update timetable entry." });
  }
}

// DELETE /api/principal/timetable/:id
export async function deleteTimetableEntry(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await ExamTimetable.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "Timetable entry not found." });
    }

    res.json({ message: "Timetable entry deleted." });
  } catch (error) {
    console.error("deleteTimetableEntry error:", error);
    res.status(500).json({ message: "Failed to delete timetable entry." });
  }
}

// POST /api/principal/timetable/publish
// Publishes every draft at once. This is what the "Publish N drafts"
// button on the principal's Timetable page calls.
export async function publishDrafts(_req: Request, res: Response) {
  try {
    const [updatedCount] = await ExamTimetable.update(
      { status: "published" },
      { where: { status: "draft" } }
    );

    res.json({
      message: updatedCount + " entry(s) published.",
      published: updatedCount,
    });
  } catch (error) {
    console.error("publishDrafts error:", error);
    res.status(500).json({ message: "Failed to publish timetable." });
  }
}
