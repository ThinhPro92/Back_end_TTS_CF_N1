import express from "express";
import * as brandController from "../controllers/brandController.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import validate from "../middlewares/validate.js";
import { checkRole } from "../middlewares/checkRole.js";
import { validateCreateBrand } from "../validations/brand.validation.js";

const router = express.Router();

// Lấy danh sách thương hiệu (công khai)
router.get("/", brandController.getBrands);

// Lấy thương hiệu theo ID (công khai)
router.get("/:id", brandController.getById);

// Tạo thương hiệu mới (chỉ admin)
router.post(
  "/",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateBrand,
  validate,
  brandController.create
);

// Cập nhật thương hiệu (chỉ admin)
router.put(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateBrand,
  validate,
  brandController.update
);

// Xóa mềm thương hiệu (chỉ admin)
router.delete(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  brandController.softDelete
);

// Khôi phục thương hiệu (admin hoặc staff)
router.put(
  "/:id/restore",
  jwtMiddleware,
  checkRole(["admin", "staff"]),
  brandController.restore
);

// Xóa vĩnh viễn thương hiệu (chỉ admin)
router.delete(
  "/:id/permanent",
  jwtMiddleware,
  checkRole(["admin"]),
  brandController.deletePermanently
);

export default router;