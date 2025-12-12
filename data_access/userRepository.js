import { db } from '../models/index.js'
import { updateUserProfile } from "../controllers/accountController.js";

export const userRepository = {
  addNewUser: async (data) => {
    // 1. Проверяем username
    const existingUser = await db.User.findOne({ where: { username: data.username } });
    if (existingUser) {
      throw new Error("Пользователь с таким username уже существует");
    }

    // 2. Проверяем email
    const existingEmail = await db.User.findOne({ where: { email: data.email } });
    if (existingEmail) {
      throw new Error("Пользователь с таким email уже существует");
    }

    // 3. Создаём нового пользователя
    const newUser = await db.User.create(data);
    return newUser;
  },

  getUserByUsername: (username) =>
    db.User.findOne({ where: { username } }),

  getUserByLoginPassword: (data) =>
    db.User.findAll({ where: { username: data.username, password: data.password } }),

  addTokenToBlacklist: async (token, decoded) => {
    const status = await db.BlacklistToken.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
      userId: decoded.id,
    });
    return status;
  },
  getUserProfile: async (id) => {
    const userProfile = await db.User.findByPk(id, {
      attributes: { exclude: ["password", "passwordResetToken", "passwordResetExpires"] }
    });
    return userProfile;
  },
  updateUserProfile: async (id, data) => {
    const userProfile = await db.User.update(data, {where: {id}});
    return userProfile;
  },
};
