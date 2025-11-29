import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class BlacklistToken extends Model {}

BlacklistToken.init(
  {
    token: {
      type: DataTypes.TEXT, // JWT может быть длинным → используем TEXT
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // опционально
    },
  },
  {
    sequelize,
    modelName: "BlacklistToken",
    timestamps: true, // createdAt, updatedAt
  }
);

export default BlacklistToken;
