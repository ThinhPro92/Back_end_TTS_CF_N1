import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validate.js";
import { validateRegister, validateLogin, validateResetPassword } from "../validations/auth.validation.js";

const router = express.Router();

// Route đăng ký
router.post("/register", validateRegister, validate, authController.register);
// Route đăng nhập
router.post("/login", validateLogin, validate, authController.login);
// Route đăng xuất
router.post("/logout", authController.logout);
// Route quên mật khẩu
router.post("/forgot-password", authController.forgotPassword);
// Route đặt lại mật khẩu
router.post("/reset-password", validateResetPassword, validate, authController.resetPassword);
// Route làm mới token
router.post("/refresh-token", authController.refreshToken);

export default router;