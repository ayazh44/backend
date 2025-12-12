import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Article extends Model {
  static associate(models) {
    Article.belongsTo(models.Category, {
      foreignKey: "categoryId",
    });

    Article.hasMany(models.Note, {
      foreignKey: "articleId",
    });

    Article.hasMany(models.Image, {
      foreignKey: "articleId",
    });

    Article.belongsToMany(models.Tag, {
      through: models.ArticleTag,
      foreignKey: "articleId",
    });
  }
}

Article.init(
  {
    categoryId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    datePublished: { type: DataTypes.DATE },
    description: { type: DataTypes.TEXT },
    content: { type: DataTypes.TEXT },
    imageUrl: { type: DataTypes.STRING },
    source: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Article",
  }
);

export default Article;
