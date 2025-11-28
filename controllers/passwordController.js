import { passwordService } from "../business_logic/passwordService.js";

export const resetPassEmail = async(req, res) => {
    try {
        const {email} = req.body;
    if (!email) {
            return res.status(400).json({ message: "Все поля обязательны" });
        }

        // Вызываем слой бизнес-логики
        const status = await passwordService.resPassEmail(email)

        return res.status(200).json({
            message: status
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}   


export const resetPassVerify = async(req, res) => {
    try {
        const {password, repeatPassword} = req.body;
    if (!password || !repeatPassword) {
            return res.status(400).json({ message: "Все поля обязательны" });
        }

        
        const { resetToken } = req.params;
        const status = await passwordService.resetPassword(password, repeatPassword, resetToken)

        return res.status(200).json({
            message: status
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}   