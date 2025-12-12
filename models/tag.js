import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Tag extends Model {
  static associate(models) {
    // Связь с Article через промежуточную таблицу ArticleTag
    Tag.belongsToMany(models.Article, {
      through: models.ArticleTag,
      foreignKey: 'tagId',
      as: 'articles'
    });
  }
}

Tag.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Tag',
  }
);

export default Tag;
