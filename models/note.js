import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Note extends Model {
  static associate(models) {
    // связь с пользователем
    Note.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    // связь со статьями
    Note.belongsTo(models.Article, {
      foreignKey: "articleId",
      as: "article",
    });
  }
}

Note.init(
  {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Note",
  }
);

export default Note;