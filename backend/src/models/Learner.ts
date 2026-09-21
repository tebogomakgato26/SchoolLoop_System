// src/models/Learner.ts
//
// Same note as Parent.ts: adjust column names to your real schema once
// you have it. The one field that matters most for this feature is
// `parentId` — that's the foreign key that links a learner to a parent,
// and it's what lets 2+ learners share the same parent record.

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Parent } from "./Parent";

export interface LearnerAttributes {
  id: string;
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: "male" | "female";
  grade: string; // e.g. "Grade 9"
  className: string | null; // e.g. "9A" - denormalized label, kept for quick display
  admissionNumber: string;
  parentId: string; // FK -> Parent.id
  classId: string | null; // FK -> Class.id - nullable since a learner can be registered before being assigned a class
  atRiskStatus: "none" | "medium" | "high";
  createdAt?: Date;
  updatedAt?: Date;
}

type LearnerCreationAttributes = Optional<
  LearnerAttributes,
  "id" | "className" | "classId" | "atRiskStatus"
>;

export class Learner
  extends Model<LearnerAttributes, LearnerCreationAttributes>
  implements LearnerAttributes
{
  public id!: string;
  public fullName!: string;
  public dateOfBirth!: string;
  public gender!: "male" | "female";
  public grade!: string;
  public className!: string | null;
  public admissionNumber!: string;
  public parentId!: string;
  public classId!: string | null;
  public atRiskStatus!: "none" | "medium" | "high";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Learner.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "full_name",
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "date_of_birth",
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: "class_name",
    },
    admissionNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      field: "admission_number",
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "parent_id",
      references: {
        model: Parent,
        key: "id",
      },
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "class_id",
      // References Class, but that import isn't added here to avoid a
      // circular import (Class doesn't need to know about Learner directly).
      // The FK constraint itself is set up via association in Attendance.ts
      // and Class.ts instead - see Class.hasMany(Learner) below.
    },
    atRiskStatus: {
      type: DataTypes.ENUM("none", "medium", "high"),
      allowNull: false,
      defaultValue: "none",
      field: "at_risk_status",
    },
  },
  {
    sequelize,
    tableName: "learners",
    timestamps: true,
    underscored: true,
  }
);

// One parent can have many learners; each learner belongs to one parent.
Parent.hasMany(Learner, { foreignKey: "parentId", as: "learners" });
Learner.belongsTo(Parent, { foreignKey: "parentId", as: "parent" });
