import { userService } from "../business_logic/userService.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
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

export const logoutUser = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log("ckdcdvvhih", authHeader);

    if (!authHeader) return res.status(400).json({ message: "No token" });
    const token = authHeader.split(" ")[1];
    

    const result = await userService.logoutUser(token);

    res.json({ message: result });
};

export const getUserProfile = async (req, res) => {
    const { userId } = req.params;
    const result = await userService.getUserProfile(userId);
    res.json({result: result});
};

export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        await userService.updateUserProfile(userId, req.body);
        res.json({ message: "Updated successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

