import {userService} from "../business_logic/userService.js";

export const registerUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;
    if (!username || !email || !password) {
            return res.status(400).json({ message: "Все поля обязательны" });
        }

        // Вызываем слой бизнес-логики
        const result = await userService.addNewUser({ username, email, password });

        return res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
            user: result
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}   

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Проверяем пустые поля
        if (!username || !password) {
            return res.status(400).json({ message: "Все поля обязательны" });
        }

        // 2. Логика
        const result = await userService.loginUser({ username, password });

        // 3. Неверный логин или пароль
        if (!result.success) {
            return res.status(400).json({ message: "Неверный логин или пароль" });
        }

        // 4. Успех — возвращаем JWT
        return res.status(200).json({
            message: "Успешный вход в систему",
            token: result.token,
            user: {
                id: result.user.id,
                username: result.user.username,
                email: result.user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
