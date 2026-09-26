// src/scripts/seed.ts
//
// Run with: npm run seed
//
// Creates one test login for each role, sample classes, enrolls any
// existing learners into a class via Enrollment, marks attendance, and
// creates assessments with marks. Real day to day use will come from
// each portal once they are fully wired - this script exists so every
// screen has real data to show while that wiring happens.
//
// Test logins created by this script:
//   Principal - principal@soshanguve.school   / password123
//   Teacher   - dlamini@soshanguve.school      / password123
//   Parent    - uses each parent's own ID number as the password,
//               only for parents that do not already have one set

import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { sequelize } from "../config/db";
import { Principal } from "../models/Principal";
import { Teacher } from "../models/Teacher";
import { Parent } from "../models/Parent";
import { Class } from "../models/Class";
import { Learner } from "../models/Learner";
import { Enrollment } from "../models/Enrollment";
import { Attendance } from "../models/Attendance";
import { Assessment } from "../models/Assessment";
import { Mark } from "../models/Mark";

const TEST_PASSWORD = "password123";

const SAMPLE_TEACHERS = [
  { fullName: "Ms Dlamini", email: "dlamini@soshanguve.school" },
  { fullName: "Mr Nkosi", email: "nkosi@soshanguve.school" },
  { fullName: "Mr Khumalo", email: "khumalo@soshanguve.school" },
];

const SAMPLE_CLASSES = [
  { grade: "Grade 9", className: "9A", subject: "Mathematics", teacherEmail: "dlamini@soshanguve.school" },
  { grade: "Grade 10", className: "10B", subject: "English", teacherEmail: "nkosi@soshanguve.school" },
  { grade: "Grade 11", className: "11A", subject: "Life Sciences", teacherEmail: "khumalo@soshanguve.school" },
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
  const pct = 0.3 + Math.random() * 0.65;
  return Math.round(total * pct);
}

async function seed() {
  await sequelize.authenticate();
  console.log("Connected to MySQL for seeding.");

  // 1. Principal test login
  const [principal, principalCreated] = await Principal.findOrCreate({
    where: { email: "principal@soshanguve.school" },
    defaults: {
      fullName: "Neo Masonganye",
      email: "principal@soshanguve.school",
      schoolName: "Soshanguve High",
      passwordHash: await bcrypt.hash(TEST_PASSWORD, 10),
    },
  });
  console.log(principalCreated ? "Created principal test login." : "Principal test login already exists.");

  // 2. Teacher test logins
  const teacherByEmail = new Map<string, Teacher>();
  for (const t of SAMPLE_TEACHERS) {
    const [teacher] = await Teacher.findOrCreate({
      where: { email: t.email },
      defaults: {
        fullName: t.fullName,
        email: t.email,
        passwordHash: await bcrypt.hash(TEST_PASSWORD, 10),
      },
    });
    teacherByEmail.set(t.email, teacher);
  }
  console.log(SAMPLE_TEACHERS.length + " teacher test logins ready.");

  // 3. Classes, linked to real teacher accounts
  // (teacherName removed - Class only stores teacherId; teacher's name is
  // reached through the association, not duplicated as a column.)
  const classes: Class[] = [];
  for (const c of SAMPLE_CLASSES) {
    const teacher = teacherByEmail.get(c.teacherEmail)!;
    const [cls] = await Class.findOrCreate({
      where: { grade: c.grade, className: c.className, subject: c.subject },
      defaults: {
        grade: c.grade,
        className: c.className,
        subject: c.subject,
        teacherId: teacher.id,
      },
    });
    // Backfill teacherId for classes created before this field existed.
    if (!cls.teacherId) {
      await cls.update({ teacherId: teacher.id });
    }
    classes.push(cls);
  }
  console.log(classes.length + " classes ready.");

  // 4. Parent passwords - default to their own ID number if not already set
  const parents = await Parent.findAll();
  let parentsUpdated = 0;
  for (const parent of parents) {
    if (!parent.passwordHash) {
      await parent.update({ passwordHash: await bcrypt.hash(parent.idNumber, 10) });
      parentsUpdated++;
    }
  }
  console.log(parentsUpdated + " parent login(s) set up (password = their ID number).");

  // 5. Learners - enroll via the Enrollment join table rather than a
  // single classId column, since a learner can now take several subjects.
  const learners = await Learner.findAll();
  if (learners.length === 0) {
    console.log(
      "No learners found. Go register a few via the principal portal's " +
        "'Register Learner' page first, then run `npm run seed` again."
    );
    process.exit(0);
  }

  let enrollmentsCreated = 0;
  for (const learner of learners) {
    const existing = await Enrollment.findAll({ where: { learnerId: learner.id } });
    if (existing.length > 0) continue; // already enrolled somewhere, leave as is

    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    await Enrollment.findOrCreate({
      where: { learnerId: learner.id, classId: randomClass.id },
      defaults: { learnerId: learner.id, classId: randomClass.id },
    });
    // className stays as a descriptive label on Learner (not a FK) so
    // dashboards that just need a display string don't need a join.
    await learner.update({ className: randomClass.className });
    enrollmentsCreated++;
  }
  console.log(enrollmentsCreated + " learner(s) newly enrolled into a class.");

  // 6. Attendance for today - one record per learner, per class they're
  // enrolled in (a learner enrolled in 2 classes gets 2 attendance rows).
  const date = todayISO();
  let attendanceCreated = 0;
  for (const learner of learners) {
    const enrollments = await Enrollment.findAll({ where: { learnerId: learner.id } });
    for (const enrollment of enrollments) {
      const [, wasCreated] = await Attendance.findOrCreate({
        where: { learnerId: learner.id, classId: enrollment.classId, date },
        defaults: { learnerId: learner.id, classId: enrollment.classId, date, status: randomStatus() },
      });
      if (wasCreated) attendanceCreated++;
    }
  }
  console.log(attendanceCreated + " attendance records created for " + date + ".");

  // 7. Assessments and marks
  let marksCreated = 0;
  for (const cls of classes) {
    const [assessment1] = await Assessment.findOrCreate({
      where: { classId: cls.id, title: "Term 2 Test 1" },
      defaults: { classId: cls.id, title: "Term 2 Test 1", totalMarks: 100, date: daysAgoISO(21) },
    });
    const [assessment2] = await Assessment.findOrCreate({
      where: { classId: cls.id, title: "Term 2 Test 2" },
      defaults: { classId: cls.id, title: "Term 2 Test 2", totalMarks: 100, date: daysAgoISO(3) },
    });

    // Learners in this class = learners with an Enrollment row for it.
    const classEnrollments = await Enrollment.findAll({ where: { classId: cls.id } });
    const classLearnerIds = classEnrollments.map((e) => e.learnerId);
    const classLearners = await Learner.findAll({ where: { id: classLearnerIds } });

    for (const learner of classLearners) {
      for (const assessment of [assessment1, assessment2]) {
        const [, wasCreated] = await Mark.findOrCreate({
          where: { assessmentId: assessment.id, learnerId: learner.id },
          defaults: { assessmentId: assessment.id, learnerId: learner.id, score: randomScore(assessment.totalMarks) },
        });
        if (wasCreated) marksCreated++;
      }
    }
  }
  console.log(marksCreated + " mark records created.");

  console.log("");
  console.log("Seed complete. Test logins:");
  console.log("  Principal: principal@soshanguve.school / " + TEST_PASSWORD);
  SAMPLE_TEACHERS.forEach((t) => console.log("  Teacher:   " + t.email + " / " + TEST_PASSWORD));
  console.log("  Parent:    use a registered parent's ID number as both identifier and password");

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});