// src/models/ExamTimetable.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface ExamTimetableAttributes {
  id: string;
  subject: string; // e.g. "Mathematics"
  grade: string; // e.g. "Grade 9"
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 - 11:00"
  venue: string; // e.g. "Hall A"
  status: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}

type ExamTimetableCreationAttributes = Optional<
  ExamTimetableAttributes,
  "id" | "status"
>;

export class ExamTimetable
  extends Model<ExamTimetableAttributes, ExamTimetableCreationAttributes>
  implements ExamTimetableAttributes
{
  public id!: string;
  public subject!: string;
  public grade!: string;
  public date!: string;
  public time!: string;
  public venue!: string;
  public status!: "draft" | "published";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ExamTimetable.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    // New entries start as drafts. Only the principal publishes, which is
    // what makes them visible to parents and teachers.
    status: {
      type: DataTypes.ENUM("draft", "published"),
      allowNull: false,
      defaultValue: "draft",
    },
  },
  {
    sequelize,
    tableName: "exam_timetable",
    timestamps: true,
    underscored: true,
  }
);
