import { sequelize } from "../config/db.js";
import User from "./user.js";

// db object
const db = {};
db.User = User;

db.sequelize = sequelize;

export { db, sequelize };