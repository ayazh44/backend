import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class ArticleTag extends Model {
  static associate(models) {
    // Обычно для промежуточной таблицы Many-to-Many ассоциации
    // определяются в связанных моделях (Article и Tag),
    // здесь можно не указывать ничего.
  }
}

ArticleTag.init(
  {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "ArticleTag",
    timestamps: false // Обычно промежуточные таблицы без createdAt/updatedAt
  }
);

export default ArticleTag;
