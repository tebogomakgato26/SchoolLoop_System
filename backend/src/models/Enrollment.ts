// src/models/Enrollment.ts
//
// This is the fix for the limitation flagged in the Term 3 report:
// previously a Learner had a single classId, meaning a learner could
// only ever belong to one class, i.e. one subject. A real learner
// takes several subjects, each of which is its own Class record
// (grade + subject + teacher). Enrollment is the join table that lets
// one learner belong to many classes, and one class have many learners,
// which is what a real timetable looks like.

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Learner } from "./Learner";
import { Class } from "./Class";

export interface EnrollmentAttributes {
  id: string;
  learnerId: string;
  classId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type EnrollmentCreationAttributes = Optional<EnrollmentAttributes, "id">;

export class Enrollment
  extends Model<EnrollmentAttributes, EnrollmentCreationAttributes>
  implements EnrollmentAttributes
{
  public id!: string;
  public learnerId!: string;
  public classId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Enrollment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    learnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "learner_id",
      references: { model: Learner, key: "id" },
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "class_id",
      references: { model: Class, key: "id" },
    },
  },
  {
    sequelize,
    tableName: "enrollments",
    timestamps: true,
    underscored: true,
    indexes: [
      // a learner is enrolled in a given class at most once
      { unique: true, fields: ["learner_id", "class_id"] },
    ],
  }
);

// The many-to-many relationship itself. "as" aliases matter here -
// Learner.getClasses() / Class.getLearners() become available, and
// controllers can include: [{ model: Class, as: "classes" }] etc.
Learner.belongsToMany(Class, { through: Enrollment, foreignKey: "learnerId", as: "classes" });
Class.belongsToMany(Learner, { through: Enrollment, foreignKey: "classId", as: "learners" });