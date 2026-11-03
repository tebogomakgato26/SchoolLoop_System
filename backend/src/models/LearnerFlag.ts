import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Learner } from "./Learner";
import { Teacher } from "./Teacher";

export interface LearnerFlagAttributes {
  id: string;
  learnerId: string;
  teacherId: string;
  reason: string;
  status: "open" | "resolved";
  createdAt?: Date;
  updatedAt?: Date;
}

type LearnerFlagCreationAttributes = Optional<LearnerFlagAttributes, "id" | "status">;

export class LearnerFlag
  extends Model<LearnerFlagAttributes, LearnerFlagCreationAttributes>
  implements LearnerFlagAttributes
{
  public id!: string;
  public learnerId!: string;
  public teacherId!: string;
  public reason!: string;
  public status!: "open" | "resolved";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LearnerFlag.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    learnerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "learner_id",
      references: { model: Learner, key: "id" },
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "teacher_id",
      references: { model: Teacher, key: "id" },
    },
    reason: { type: DataTypes.STRING(500), allowNull: false },
    status: {
      type: DataTypes.ENUM("open", "resolved"),
      allowNull: false,
      defaultValue: "open",
    },
  },
  {
    sequelize,
    tableName: "learner_flags",
    timestamps: true,
    underscored: true,
    indexes: [{ unique: true, fields: ["learner_id", "teacher_id"] }],
  }
);

LearnerFlag.belongsTo(Learner, { foreignKey: "learnerId", as: "learner" });
LearnerFlag.belongsTo(Teacher, { foreignKey: "teacherId", as: "teacher" });