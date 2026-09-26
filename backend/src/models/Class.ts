// src/models/Class.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Teacher } from "./Teacher";

export interface ClassAttributes {
  id: string;
  grade: string; // e.g. "Grade 9"
  className: string; // e.g. "9A"
  subject: string; // e.g. "Mathematics"
  teacherId: string; // FK -> Teacher.id
  createdAt?: Date;
  updatedAt?: Date;
}

type ClassCreationAttributes = Optional<ClassAttributes, "id">;

export class Class
  extends Model<ClassAttributes, ClassCreationAttributes>
  implements ClassAttributes
{
  public id!: string;
  public grade!: string;
  public className!: string;
  public subject!: string;
  public teacherId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Class.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    grade: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    className: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: "class_name",
    },
    subject: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "teacher_id",
      references: { model: Teacher, key: "id" },
    },
  },
  {
    sequelize,
    tableName: "classes",
    timestamps: true,
    underscored: true,
  }
);

// Note: Class <-> Learner is now many-to-many, declared in Enrollment.ts
// (Learner.belongsToMany(Class, { through: Enrollment })), not here.
Teacher.hasMany(Class, { foreignKey: "teacherId", as: "classes" });
Class.belongsTo(Teacher, { foreignKey: "teacherId", as: "teacher" });