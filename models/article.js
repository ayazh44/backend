'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });

      Article.hasMany(models.Note, { foreignKey: 'articleId', as: 'notes' });

      Article.hasMany(models.Image, { foreignKey: 'articleId', as: 'images' });

      Article.belongsToMany(models.Tag, { through: models.ArticleTag, foreignKey: 'articleId', as: 'tags' });
    }
  }
  Article.init({
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    datePublished: DataTypes.DATE,
    description: DataTypes.TEXT,
    content: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};