import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../configs/enviroments.js";

// Gửi email
export const sendEmail = async (email, subject, text, html = null) => {
  try {
    // Cấu hình transporter cho Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    // Cấu hình email
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
      html: html || text, // Sử dụng HTML nếu có, nếu không dùng text
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Lỗi khi gửi email: " + error.message);
  }
};