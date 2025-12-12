import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Image extends Model {
  static associate(models) {
    // Связь: изображение принадлежит статье
    Image.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article'
    });
  }
}

Image.init(
  {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Image',
  }
);

export default Image;
