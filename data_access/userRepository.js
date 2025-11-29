import User from "../models/user.js";
import BlacklistToken from "../models/blacklistToken.js";
import { updateUserProfile } from "../controllers/accountController.js";

export const userRepository = {
  addNewUser: async (data) => {
    // 1. Проверяем username
    const existingUser = await User.findOne({ where: { username: data.username } });
    if (existingUser) {
      throw new Error("Пользователь с таким username уже существует");
    }

    // 2. Проверяем email
    const existingEmail = await User.findOne({ where: { email: data.email } });
    if (existingEmail) {
      throw new Error("Пользователь с таким email уже существует");
    }

    // 3. Создаём нового пользователя
    const newUser = await User.create(data);
    return newUser;
  },

  getUserByUsername: (username) =>
    User.findOne({ where: { username } }),

  getUserByLoginPassword: (data) =>
    User.findAll({ where: { username: data.username, password: data.password } }),

  addTokenToBlacklist: async (token, decoded) => {
    const status = await BlacklistToken.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
      userId: decoded.id,
    });
    return status;
  },
  getUserProfile: async (id) => {
    const userProfile = await User.findByPk(id, {
      attributes: { exclude: ["password", "passwordResetToken", "passwordResetExpires"] }
    });
    return userProfile;
  },
  updateUserProfile: async (id, data) => {
    const userProfile = await User.update(data, {where: {id}});
    return userProfile;
  },
};
