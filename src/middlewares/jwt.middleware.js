import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { JWT_SECRET } from "../configs/enviroments.js";
import User from "../models/User.js";

const jwtMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) return next(createError(401, "Bạn cần phải đăng nhập"));

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId || decoded.id;

    const user = await User.findById(userId).populate("roleId");

    if (!user) return next(createError(401, "Tài khoản không tồn tại"));

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.roleId, // ví dụ: { _id: ..., name: "admin", description: ... }
    };

    next();
  } catch (error) {
    return next(createError(403, "Token không hợp lệ"));
  }
};

export default jwtMiddleware;
