import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { JWT_SECRET } from "../configs/enviroments.js";
import User from "../models/User.js";

// Middleware xác thực JWT
const jwtMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ cookie hoặc header Authorization
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) return next(createError(401, "Bạn cần phải đăng nhập"));

    // Xác minh token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Tìm người dùng theo ID và lấy thông tin vai trò
    const user = await User.findById(decoded.id).populate("roleId");
    if (!user) return next(createError(401, "Tài khoản không tồn tại"));

    // Gán thông tin người dùng vào req
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: {
        name: user.roleId?.name || "client", // Mặc định là client nếu không có vai trò
      },
    };

    next();
  } catch (error) {
    return next(createError(403, "Token không hợp lệ"));
  }
};

export default jwtMiddleware;