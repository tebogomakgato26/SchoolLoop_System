// src/models/Attendance.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Learner } from "./Learner";
import { Class } from "./Class";

export interface AttendanceAttributes {
  id: string;
  learnerId: string; // FK -> Learner.id
  classId: string; // FK -> Class.id
  date: string; // YYYY-MM-DD
  status: "present" | "absent" | "late";
  createdAt?: Date;
  updatedAt?: Date;
}

type AttendanceCreationAttributes = Optional<AttendanceAttributes, "id">;

export class Attendance
  extends Model<AttendanceAttributes, AttendanceCreationAttributes>
  implements AttendanceAttributes
{
  public id!: string;
  public learnerId!: string;
  public classId!: string;
  public date!: string;
  public status!: "present" | "absent" | "late";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attendance.init(
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("present", "absent", "late"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "attendance",
    timestamps: true,
    underscored: true,
    indexes: [
      // one attendance record per learner, per class, per day
      { unique: true, fields: ["learner_id", "class_id", "date"] },
    ],
  }
);

Class.hasMany(Attendance, { foreignKey: "classId", as: "attendanceRecords" });
Attendance.belongsTo(Class, { foreignKey: "classId", as: "class" });

Learner.hasMany(Attendance, { foreignKey: "learnerId", as: "attendanceRecords" });
Attendance.belongsTo(Learner, { foreignKey: "learnerId", as: "learner" });
