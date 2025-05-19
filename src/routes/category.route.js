import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import validate from "../middlewares/validate.js";
import { validateCreateCategory } from "../validations/category.validation.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);

router.post(
  "/",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateCategory,
  validate,
  categoryController.create
);

router.put(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateCategory,
  validate,
  categoryController.update
);

router.delete(
  "/:id",
  jwtMiddleware,
  checkRole(["admin"]),
  categoryController.softDelete
);

export default router;
