// src/models/Class.ts
//
// Simplified for now: teacherName is a plain string rather than a
// foreign key to a real Teacher table, since teacher accounts/auth
// haven't been built yet (that's a teammate's portal). Once that
// exists, swap teacherName for a teacherId FK the same way parentId
// works on Learner.

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Learner } from "./Learner";

export interface ClassAttributes {
  id: string;
  grade: string; // e.g. "Grade 9"
  className: string; // e.g. "9A"
  subject: string; // e.g. "Mathematics"
  teacherName: string; // e.g. "Ms Dlamini"
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
  public teacherName!: string;
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
    teacherName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "teacher_name",
    },
  },
  {
    sequelize,
    tableName: "classes",
    timestamps: true,
    underscored: true,
  }
);

// A class has many learners; each learner belongs to (at most) one class.
Class.hasMany(Learner, { foreignKey: "classId", as: "learners" });
Learner.belongsTo(Class, { foreignKey: "classId", as: "class" });
