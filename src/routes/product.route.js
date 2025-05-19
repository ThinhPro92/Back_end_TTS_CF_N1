import express from "express";
import * as productController from "../controllers/productController.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import validate from "../middlewares/validate.js";
import checkRole from "../middlewares/checkRole.js"; // ✅ Thay thế
import { validateCreateProduct } from "../validations/product.validation.js";

const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Chỉ admin có quyền thêm/sửa/xoá
router.post(
  "/",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateProduct,
  validate,
  productController.create
);

router.put(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  productController.update
);

router.delete(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  productController.softDelete
);
router.put(
  "/:id/restore",
  jwtMiddleware,
  checkRole(["admin", "staff"]),
  productController.restore
);
router.delete(
  "/:id/permanent",
  jwtMiddleware,
  checkRole(["admin"]),
  productController.deletePermanently
);
export default router;
