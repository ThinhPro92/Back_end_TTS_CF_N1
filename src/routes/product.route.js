import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

// Lấy tất cả sản phẩm
router.get("/", productController.getAll);

// Tạo mới sản phẩm
router.post("/", productController.create);

// Lấy chi tiết theo ID
router.get("/:id", productController.getById);

// Cập nhật sản phẩm
router.put("/:id", productController.update);

// Xoá mềm sản phẩm
router.delete("/:id", productController.softDelete);

export default router;
