import express from "express";
import * as userController from "../controllers/userController.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import validate from "../middlewares/validate.js";
import checkRole from "../middlewares/checkRole.js";
import { validateCreateUser } from "../validations/user.validation.js";

const router = express.Router();

// Chỉ admin mới được quản lý người dùng
router.get("/", jwtMiddleware, checkRole(["admin"]), userController.getAll);
router.get("/:id", jwtMiddleware, checkRole(["admin"]), userController.getById);
router.post(
  "/",
  jwtMiddleware,
  checkRole(["admin"]),
  validateCreateUser,
  validate,
  userController.create
);
router.put("/:id", jwtMiddleware, checkRole(["admin"]), userController.update);
router.put("/:id/block", jwtMiddleware, checkRole(["admin"]), userController.blockUser);
router.delete("/:id", jwtMiddleware, checkRole(["admin"]), userController.blockUser);

// Profile của chính mình
router.get("/profile", jwtMiddleware, userController.getProfile);

export default router;
