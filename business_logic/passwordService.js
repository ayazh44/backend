import { passwordRepository } from "../data_access/passwordRepository.js";
import { sendEmail } from "../services/mailer.js";
import crypto from "crypto";

export const passwordService = {
    resPassEmail: async (email) => {
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
        const userStatus = await passwordRepository.resPassEmail(email, hashedToken)

        if (userStatus == false)
            return "Такого юзера нет"

        const resetURL = `http://localhost:3000/api/password/reset-password-done/${hashedToken}`;

        await sendEmail({
            to: email,
            subject: "Восстановление пароля",
            html: `
        <h2>Восстановление пароля</h2>
        <p>Вы запросили восстановление пароля.</p>
        <p>Перейдите по ссылке ниже, чтобы сбросить пароль:</p>
        <a href="${resetURL}">${resetURL}</a>
        <br><br>
        <p>Ссылка действует 10 минут.</p>
      `,
        });

        return "Ссылка успешно отправлена!"
    },
    resetPassword : async (password, repeatPassword, resetToken) =>{
        let status = "Пароли не совпадают";
        if (password == repeatPassword) {
            status = await passwordRepository.resetPassword(password, resetToken)
        }

        return status;
    }


};

