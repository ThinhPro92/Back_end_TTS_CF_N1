import { body } from "express-validator";

// Xác thực khi tạo/cập nhật thương hiệu
export const validateCreateBrand = [
  body("name")
    .notEmpty()
    .withMessage("Tên thương hiệu là bắt buộc")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Tên thương hiệu phải từ 3 đến 100 ký tự"),
  body("logoUrl")
    .optional()
    .isURL()
    .withMessage("Logo phải là một URL hợp lệ")
    .trim(),
  body("description")
    .optional()
    .isString()
    .withMessage("Mô tả phải là chuỗi văn bản")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Mô tả tối đa 500 ký tự"),
];