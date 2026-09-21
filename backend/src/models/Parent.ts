// src/models/Parent.ts
//
// NOTE: Column names here are reasonable defaults, NOT taken from your
// actual Term 2 DBML schema (you didn't have it on hand). Once you're
// back at your schema, compare these fields against your real `Parent`
// table and adjust — the important structural piece (the parent_id FK
// on Learner, below) will stay correct regardless of exact column names.

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface ParentAttributes {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string | null;
  idNumber: string; // SA ID number - used to check for duplicates when searching
  relationship: "mother" | "father" | "guardian";
  // Nullable because parents are created by the principal during
  // registration, before they have ever logged in themselves. The
  // registration flow (and the seed script, for parents that predate
  // this field) sets this to a hash of their ID number as a starting
  // password.
  passwordHash: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type ParentCreationAttributes = Optional<
  ParentAttributes,
  "id" | "email" | "passwordHash"
>;

export class Parent
  extends Model<ParentAttributes, ParentCreationAttributes>
  implements ParentAttributes
{
  public id!: string;
  public fullName!: string;
  public phoneNumber!: string;
  public email!: string | null;
  public idNumber!: string;
  public relationship!: "mother" | "father" | "guardian";
  public passwordHash!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Parent.init(
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
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "phone_number",
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    idNumber: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true, // prevents the same parent being registered twice
      field: "id_number",
    },
    relationship: {
      type: DataTypes.ENUM("mother", "father", "guardian"),
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "password_hash",
    },
  },
  {
    sequelize,
    tableName: "parents",
    timestamps: true,
    underscored: true,
  }
);