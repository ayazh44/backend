import jwt from "jsonwebtoken";
import { userRepository } from "../data_access/userRepository.js";


const JWT_SECRET = "SUPER_SECRET_KEY"; // вынеси в .env


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
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        return { success: true, token, user };
    }
};
