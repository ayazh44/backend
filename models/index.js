import { sequelize } from "../config/db.js";
import User from "./user.js";
import Article from "./article.js";

// db object
const db = {};
db.User = User;
db.Article = Article;

db.sequelize = sequelize;

export { db, sequelize };