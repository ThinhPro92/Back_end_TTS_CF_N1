import { body } from "express-validator";
import User from "../models/User.js";

// Regex kiểm tra email
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

// Xác thực đăng ký
export const validateRegister = [
  body("name")
    .notEmpty()
    .withMessage("Tên người dùng là bắt buộc")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Tên phải từ 2 đến 50 ký tự"),
  body("email")
    .matches(emailRegex)
    .withMessage("Email không hợp lệ")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email đã tồn tại");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 ký tự"),
  body("roleId")
    .optional()
    .isMongoId()
    .withMessage("ID vai trò không hợp lệ"),
];

// Xác thực đăng nhập
export const validateLogin = [
  body("email")
    .matches(emailRegex)
    .withMessage("Email không hợp lệ"),
  body("password")
    .notEmpty()
    .withMessage("Mật khẩu là bắt buộc"),
];

// Xác thực mã đặt lại mật khẩu
export const validateVerifyResetCode = [
  body("token")
    .notEmpty()
    .withMessage("Token là bắt buộc"),
  body("code")
    .notEmpty()
    .withMessage("Mã đặt lại là bắt buộc")
    .isLength({ min: 8, max: 8 })
    .withMessage("Mã đặt lại phải là 8 ký tự"),
];

// Xác thực đặt lại mật khẩu
export const validateResetPassword = [
  body("token")
    .notEmpty()
    .withMessage("Token là bắt buộc"),
  body("code")
    .notEmpty()
    .withMessage("Mã đặt lại là bắt buộc")
    .isLength({ min: 8, max: 8 })
    .withMessage("Mã đặt lại phải là 8 ký tự"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu 6 ký tự"),
];

// Xác thực đổi mật khẩu
export const validateChangePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Mật khẩu cũ là bắt buộc"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu mới tối thiểu 6 ký tự")
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new Error("Mật khẩu mới không được trùng với mật khẩu cũ");
      }
      return true;
    }),
];