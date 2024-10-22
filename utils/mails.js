// mail.js - Mail Transporter Configuration for Advertisement App
import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'frankkoomson1@gmail.com', // Replace with your email address
        pass:  process.env.MAIL_PASS_KEY     // app-specific password (generated in Google Account)
    }
});
