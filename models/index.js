// models/index.js
import { sequelize } from "../config/db.js";
import User from "./user.js";
import Article from "./article.js";
import Note from "./note.js";
import Category from "./category.js";
import Tag from "./tag.js";
import ArticleTag from "./articleTag.js";
import Image from "./image.js";
import BlacklistToken from "./blacklistToken.js";

const db = {
  User,
  Article,
  Note,
  Category,
  Tag,
  ArticleTag,
  Image,
  BlacklistToken,
};

// вызываем associate для каждой модели
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;

export { db, sequelize };
