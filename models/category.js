import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Category extends Model {
  static associate(models) {
    // Связь: категория имеет много статей
    Category.hasMany(models.Article, {
      foreignKey: 'categoryId',
    });
  }
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Category',
  }
);

export default Category;
