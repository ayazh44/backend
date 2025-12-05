import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Article extends Model {
  static associate(models) {
    Article.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Article.hasMany(models.Note, {
      foreignKey: "articleId",
      as: "notes",
    });

    Article.hasMany(models.Image, {
      foreignKey: "articleId",
      as: "images",
    });

    Article.belongsToMany(models.Tag, {
      through: models.ArticleTag,
      foreignKey: "articleId",
      as: "tags",
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
