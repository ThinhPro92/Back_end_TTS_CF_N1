import { body } from "express-validator";

export const validateCreateCategory = [
  body("name").notEmpty().withMessage("Tên danh mục là bắt buộc"),
  body("description").optional().isString().withMessage("Mô tả phải là chuỗi"),
];
