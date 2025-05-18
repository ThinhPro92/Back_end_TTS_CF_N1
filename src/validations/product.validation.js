import { body } from "express-validator";

export const validateCreateProduct = [
  body("name").notEmpty().withMessage("Tên sản phẩm là bắt buộc"),
  body("price").isNumeric().withMessage("Giá phải là số"),
  body("importPrice").isNumeric().withMessage("Giá nhập phải là số"),
  body("salePrice").isNumeric().withMessage("Giá bán phải là số"),
  body("brandId").notEmpty().withMessage("Phải có brandId"),
  body("categoryId").notEmpty().withMessage("Phải có categoryId"),
];
