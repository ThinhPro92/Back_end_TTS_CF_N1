import { body } from "express-validator";

export const validateCreateBrand = [
  body("name").notEmpty().withMessage("Tên thương hiệu là bắt buộc"),
  body("logoUrl")
    .optional()
    .isURL()
    .withMessage("Logo phải là một URL hợp lệ"),
  body("description")
    .optional()
    .isString()
    .withMessage("Mô tả phải là chuỗi văn bản"),
];
