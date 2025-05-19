import express from "express";
import * as brandController from "../controllers/brandController.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import validate from "../middlewares/validate.js";
import checkRole from "../middlewares/checkRole.js"; // ✅ Thay vì checkPermission
import { validateCreateBrand } from "../validations/brand.validation.js";

const router = express.Router();

router.get("/", brandController.getAll);
router.get("/:id", brandController.getById);

router.post(
  "/",
  jwtMiddleware,
  checkRole(["admin"]), // ✅ Chỉ admin được tạo thương hiệu
  validateCreateBrand,
  validate,
  brandController.create
);

router.put(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateBrand,
  validate,
  brandController.update
);

router.delete(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  brandController.softDelete
);

export default router;
