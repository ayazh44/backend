import User from "../models/user.js";

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
    User.findAll({ where: { username: data.username, password: data.password } })
};
