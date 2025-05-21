import { body } from "express-validator";

// Xác thực đăng ký
export const validateRegister = [
  body("name").notEmpty().withMessage("Tên người dùng là bắt buộc"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").isLength({ min: 6 }).withMessage("Mật khẩu tối thiểu 6 ký tự"),
];

// Xác thực đăng nhập
export const validateLogin = [
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").notEmpty().withMessage("Mật khẩu là bắt buộc"),
];

// Xác thực đặt lại mật khẩu
export const validateResetPassword = [
  body("token").notEmpty().withMessage("Token là bắt buộc"),
  body("password").isLength({ min: 6 }).withMessage("Mật khẩu tối thiểu 6 ký tự"),
];