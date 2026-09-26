// src/models/Parent.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export type Relationship = "mother" | "father" | "guardian";

export interface ParentAttributes {
  id: string;
  fullName: string;
  phoneNumber: string;
  idNumber: string;
  email: string | null;
  relationship: Relationship;
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
  public idNumber!: string;
  public email!: string | null;
  public relationship!: Relationship;
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
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "full_name",
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "phone_number",
    },
    idNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: "id_number",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    relationship: {
      type: DataTypes.ENUM("mother", "father", "guardian"),
      allowNull: false,
    },
    // Nullable because parents are created by the principal during
    // registration, before they have ever logged in themselves. The seed
    // script (and, later, the registration flow) sets this to a hash of
    // their ID number as a starting password.
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
