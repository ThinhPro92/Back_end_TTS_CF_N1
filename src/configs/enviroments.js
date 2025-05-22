import dotenv from "dotenv";

// Tải biến môi trường từ file .env
dotenv.config();

export const {
  PORT, // Cổng server
  DB_URI, // URI cơ sở dữ liệu
  JWT_SECRET, // Bí mật cho JWT
  JWT_REFRESH_SECRET, // Bí mật cho refresh token
  NODE_ENV, // Môi trường (development/production)
  EMAIL_USERNAME = "damthinh03@gmail.com", // Email gửi
  EMAIL_PASSWORD = "gdcr fluo ljdc ajue", // Mật khẩu email (sử dụng App Password)
  RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET || "your-reset-secret", // Bí mật cho token đặt lại mật khẩu
  RESET_PASSWORD_EXPIRES = process.env.RESET_PASSWORD_EXPIRES || "15m", // Thời gian hết hạn token đặt lại
  FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173", // URL front-end
} = process.env;