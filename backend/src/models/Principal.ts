// src/models/Principal.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface PrincipalAttributes {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  schoolName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type PrincipalCreationAttributes = Optional<PrincipalAttributes, "id">;

export class Principal
  extends Model<PrincipalAttributes, PrincipalCreationAttributes>
  implements PrincipalAttributes
{
  public id!: string;
  public fullName!: string;
  public email!: string;
  public passwordHash!: string;
  public schoolName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Principal.init(
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
    schoolName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "school_name",
    },
  },
  {
    sequelize,
    tableName: "principals",
    timestamps: true,
    underscored: true,
  }
);
