import jwt from "jsonwebtoken";
import { userRepository } from "../data_access/userRepository.js";

export const userService = {
    addNewUser: async (data) => {
        return await userRepository.addNewUser(data);
    },

    loginUser: async ({ username, password }) => {
        // 1. Ищем пользователя
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            return { success: false, message: "Неверный логин или пароль" };
        }

        // 2. Сравниваем пароль (bcrypt.compare)
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return { success: false, message: "Неверный логин или пароль" };
        }

        // 3. Генерируем JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return { success: true, token, user };
    },
    logoutUser: async (token) => {
        let response = "Успешно!";
        // Декодируем токен, чтобы взять exp
        const decoded = jwt.decode(token);
        console.log("hbhj", decoded)
        if (!decoded) {
            response = "invalid Token";
            return response;
        }

        let status = await userRepository.addTokenToBlacklist(token, decoded);
        if (!status)
            response = "Произошла ошибка!";
        return response;
    },
    getUserProfile: async (id) => {
        const userProfile = await userRepository.getUserProfile(id);

        if (!userProfile) {
            let result = "Не удалось загрузить данные профиля";
            return result;
        }
        return userProfile;
    },
    updateUserProfile: async (id, data) => {
        const userProfile = await userRepository.updateUserProfile(id, data);

        if(!userProfile) {
            let result = "не удалось изменить данные";
            return result;
        }
        return userProfile;
    },
};
