import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,    // твоя почта Gmail
            pass: process.env.GMAIL_APP_PASS,    // пароль приложения (не обычный пароль!)
        },
    });

    await transporter.sendMail({
        from: `"Support" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html,
    });
};
