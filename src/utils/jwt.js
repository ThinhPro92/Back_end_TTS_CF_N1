import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../configs/enviroments.js";

// Tạo token truy cập
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: { name: user.roleId?.name || "client" } },
    JWT_SECRET,
    { expiresIn: "1d" } // Hết hạn sau 1 ngày
  );
};

// Tạo refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: { name: user.roleId?.name || "client" } },
    JWT_REFRESH_SECRET,
    { expiresIn: "60d" } // Hết hạn sau 60 ngày
  );
};

export { generateToken, generateRefreshToken };