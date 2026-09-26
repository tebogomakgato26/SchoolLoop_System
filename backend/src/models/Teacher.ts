// src/models/Teacher.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface TeacherAttributes {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TeacherCreationAttributes = Optional<TeacherAttributes, "id">;

export class Teacher
  extends Model<TeacherAttributes, TeacherCreationAttributes>
  implements TeacherAttributes
{
  public id!: string;
  public fullName!: string;
  public email!: string;
  public passwordHash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Teacher.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "full_name",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },
  },
  {
    sequelize,
    tableName: "teachers",
    timestamps: true,
    underscored: true,
  }
);
