// src/scripts/seed.ts
//
// Run with: npm run seed
//
// Creates sample Classes, marks today's Attendance, and now also
// creates two sample Assessments per class with marks entered for
// every learner - so both the Dashboard and Performance pages show
// real numbers. Real attendance/marks entry will eventually come from
// the Teacher portal once that's fully built - this script is just a
// stand-in so you're not stuck looking at empty pages in the meantime.

import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "../config/db";
import { Class } from "../models/Class";
import { Learner } from "../models/Learner";
import { Attendance } from "../models/Attendance";
import { Assessment } from "../models/Assessment";
import { Mark } from "../models/Mark";

const SAMPLE_CLASSES = [
  { grade: "Grade 9", className: "9A", subject: "Mathematics", teacherName: "Ms Dlamini" },
  { grade: "Grade 10", className: "10B", subject: "English", teacherName: "Mr Nkosi" },
  { grade: "Grade 11", className: "11A", subject: "Life Sciences", teacherName: "Mr Khumalo" },
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function randomStatus(): "present" | "absent" | "late" {
  const roll = Math.random();
  if (roll < 0.82) return "present";
  if (roll < 0.94) return "absent";
  return "late";
}

function randomScore(total: number): number {
  // Weighted somewhat realistically between 30% and 95%
  const pct = 0.3 + Math.random() * 0.65;
  return Math.round(total * pct);
}

async function seed() {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL for seeding.");

  // 1. Classes
  const classes: Class[] = [];
  for (const c of SAMPLE_CLASSES) {
    const [cls] = await Class.findOrCreate({
      where: { grade: c.grade, className: c.className, subject: c.subject },
      defaults: c,
    });
    classes.push(cls);
  }
  console.log(`✅ ${classes.length} classes ready.`);

  // 2. Learners
  const learners = await Learner.findAll();
  if (learners.length === 0) {
    console.log(
      "⚠️  No learners found. Go register a few via the principal portal's " +
        "'Register Learner' page first, then run `npm run seed` again."
    );
    process.exit(0);
  }

  // 3. Assign unassigned learners to a random class
  for (const learner of learners) {
    if (!learner.classId) {
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      await learner.update({ classId: randomClass.id, className: randomClass.className });
    }
  }
  console.log(`✅ ${learners.length} learners assigned to classes.`);

  // 4. Attendance for today
  const date = todayISO();
  let attendanceCreated = 0;
  for (const learner of learners) {
    const reloaded = await Learner.findByPk(learner.id);
    if (!reloaded?.classId) continue;

    const [, wasCreated] = await Attendance.findOrCreate({
      where: { learnerId: learner.id, classId: reloaded.classId, date },
      defaults: {
        learnerId: learner.id,
        classId: reloaded.classId,
        date,
        status: randomStatus(),
      },
    });
    if (wasCreated) attendanceCreated++;
  }
  console.log(`✅ ${attendanceCreated} attendance records created for ${date}.`);

  // 5. Assessments + Marks per class (two per class, so a trend can be calculated)
  let assessmentsCreated = 0;
  let marksCreated = 0;

  for (const cls of classes) {
    const [assessment1] = await Assessment.findOrCreate({
      where: { classId: cls.id, title: "Term 2 Test 1" },
      defaults: {
        classId: cls.id,
        title: "Term 2 Test 1",
        totalMarks: 100,
        date: daysAgoISO(21),
      },
    });
    const [assessment2] = await Assessment.findOrCreate({
      where: { classId: cls.id, title: "Term 2 Test 2" },
      defaults: {
        classId: cls.id,
        title: "Term 2 Test 2",
        totalMarks: 100,
        date: daysAgoISO(3),
      },
    });

    if (!(assessment1 as any)._options.isNewRecord) assessmentsCreated += 0;

    const classLearners = await Learner.findAll({ where: { classId: cls.id } });

    for (const learner of classLearners) {
      for (const assessment of [assessment1, assessment2]) {
        const [, wasCreated] = await Mark.findOrCreate({
          where: { assessmentId: assessment.id, learnerId: learner.id },
          defaults: {
            assessmentId: assessment.id,
            learnerId: learner.id,
            score: randomScore(assessment.totalMarks),
          },
        });
        if (wasCreated) marksCreated++;
      }
    }
    assessmentsCreated += 2;
  }

  console.log(`✅ Assessments ready (${assessmentsCreated} across all classes).`);
  console.log(`✅ ${marksCreated} mark records created.`);
  console.log("🎉 Seed complete. Refresh your dashboard and performance pages to see real numbers.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
