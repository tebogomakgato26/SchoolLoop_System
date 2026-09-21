// src/models/Mark.ts

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Assessment } from "./Assessment";
import { Learner } from "./Learner";

export interface MarkAttributes {
  id: string;
  assessmentId: string; // FK -> Assessment.id
  learnerId: string; // FK -> Learner.id
  score: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type MarkCreationAttributes = Optional<MarkAttributes, "id">;

export class Mark
  extends Model<MarkAttributes, MarkCreationAttributes>
  implements MarkAttributes
{
  public id!: string;
  public assessmentId!: string;
  public learnerId!: string;
  public score!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Mark.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    assessmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "assessment_id",
      references: { model: Assessment, key: "id" },
    },
    learnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "learner_id",
      references: { model: Learner, key: "id" },
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "marks",
    timestamps: true,
    underscored: true,
    indexes: [
      // one score per learner, per assessment - re-submitting corrects it, doesn't duplicate
      { unique: true, fields: ["assessment_id", "learner_id"] },
    ],
  }
);

Assessment.hasMany(Mark, { foreignKey: "assessmentId", as: "marks" });
Mark.belongsTo(Assessment, { foreignKey: "assessmentId", as: "assessment" });

Learner.hasMany(Mark, { foreignKey: "learnerId", as: "marks" });
Mark.belongsTo(Learner, { foreignKey: "learnerId", as: "learner" });
