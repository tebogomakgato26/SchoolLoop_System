// src/models/Assessment.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Class } from "./Class";

export interface AssessmentAttributes {
  id: string;
  classId: string; // FK -> Class.id
  title: string; // e.g. "Term 2 Test 1"
  totalMarks: number; // e.g. 100
  date: string; // YYYY-MM-DD
  createdAt?: Date;
  updatedAt?: Date;
}

type AssessmentCreationAttributes = Optional<AssessmentAttributes, "id">;

export class Assessment
  extends Model<AssessmentAttributes, AssessmentCreationAttributes>
  implements AssessmentAttributes
{
  public id!: string;
  public classId!: string;
  public title!: string;
  public totalMarks!: number;
  public date!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assessment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    classId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "class_id",
      references: { model: Class, key: "id" },
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "total_marks",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "assessments",
    timestamps: true,
    underscored: true,
  }
);

Class.hasMany(Assessment, { foreignKey: "classId", as: "assessments" });
Assessment.belongsTo(Class, { foreignKey: "classId", as: "class" });
