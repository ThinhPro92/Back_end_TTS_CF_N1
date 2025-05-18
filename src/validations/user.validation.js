import { body } from "express-validator";

export const validateCreateUser = [
  body("name").notEmpty().withMessage("Tên người dùng là bắt buộc"),
  body("email").isEmail().withMessage("Email không hợp lệ"),
  body("password").isLength({ min: 6 }).withMessage("Mật khẩu tối thiểu 6 ký tự"),
  body("phone").notEmpty().withMessage("Số điện thoại là bắt buộc"),
  body("gender").isIn(["male", "female", "other"]).withMessage("Giới tính không hợp lệ"),
  body("statusUser").optional().isIn(["active", "banned"]),
  body("roleId").notEmpty().withMessage("Phải chọn vai trò người dùng (roleId)"),
];
