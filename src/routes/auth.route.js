import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validate.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import { validateRegister, validateLogin, validateResetPassword, validateVerifyResetCode, validateChangePassword } from "../validations/auth.validation.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Thông tin đăng ký người dùng
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Nguyễn Văn A
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: password123
 *             roleId:
 *               type: string
 *               example: 60f7b2c3e4b0c12345678901
 *           required:
 *             - name
 *             - email
 *             - password
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tài khoản đã được tạo thành công
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60f7b2c3e4b0c12345678902
 *                     name:
 *                       type: string
 *                       example: Nguyễn Văn A
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: client
 *                 token:
 *                   type: string
 *                   example: jwt_token
 *       400:
 *         description: Lỗi dữ liệu đầu vào
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route đăng ký
router.post("/register", validateRegister, validate, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Thông tin đăng nhập
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: password123
 *           required:
 *             - email
 *             - password
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token
 *                 refreshToken:
 *                   type: string
 *                   example: refresh_token
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60f7b2c3e4b0c12345678902
 *                     name:
 *                       type: string
 *                       example: Nguyễn Văn A
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: client
 *       401:
 *         description: Sai email hoặc mật khẩu
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route đăng nhập
router.post("/login", validateLogin, validate, authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: string
 *               example: Đăng xuất thành công
 */
// Route đăng xuất
router.post("/logout", authController.logout);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Yêu cầu đặt lại mật khẩu
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Email để gửi mã đặt lại
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *           required:
 *             - email
 *     responses:
 *       200:
 *         description: Email chứa mã đặt lại đã được gửi
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email chứa mã đặt lại mật khẩu đã được gửi
 *                 resetToken:
 *                   type: string
 *                   example: jwt_reset_token
 *       404:
 *         description: Không tìm thấy người dùng
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route quên mật khẩu
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /auth/verify-reset-code:
 *   post:
 *     summary: Xác minh mã đặt lại mật khẩu
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Token và mã đặt lại
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: jwt_reset_token
 *             code:
 *               type: string
 *               example: ABCD1234
 *           required:
 *             - token
 *             - code
 *     responses:
 *       200:
 *         description: Mã đặt lại hợp lệ
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Mã đặt lại mật khẩu hợp lệ
 *                 userId:
 *                   type: string
 *                   example: 60f7b2c3e4b0c12345678902
 *       400:
 *         description: Token hoặc mã không hợp lệ
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route xác minh mã đặt lại mật khẩu
router.post("/verify-reset-code", validateVerifyResetCode, validate, authController.verifyResetCode);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Đặt lại mật khẩu
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Token, mã và mật khẩu mới
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: jwt_reset_token
 *             code:
 *               type: string
 *               example: ABCD1234
 *             password:
 *               type: string
 *               example: newpassword123
 *           required:
 *             - token
 *             - code
 *             - password
 *     responses:
 *       200:
 *         description: Mật khẩu đã được đặt lại
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: string
 *               example: Mật khẩu đã được đặt lại thành công
 *       400:
 *         description: Token hoặc mã không hợp lệ
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route đặt lại mật khẩu
router.post("/reset-password", validateResetPassword, validate, authController.resetPassword);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Đổi mật khẩu người dùng
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         type: string
 *         example: Bearer jwt_token
 *       - in: body
 *         name: body
 *         description: Mật khẩu cũ và mới
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *               example: oldpassword123
 *             newPassword:
 *               type: string
 *               example: newpassword123
 *           required:
 *             - oldPassword
 *             - newPassword
 *     responses:
 *       200:
 *         description: Mật khẩu đã được đổi
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: string
 *               example: Mật khẩu đã được đổi thành công
 *       401:
 *         description: Mật khẩu cũ không đúng hoặc không có quyền
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route đổi mật khẩu
router.post("/change-password", jwtMiddleware, validateChangePassword, validate, authController.changePassword);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Làm mới token truy cập
 *     tags: [Authentication]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Refresh token
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *               example: refresh_token
 *           required:
 *             - refreshToken
 *     responses:
 *       200:
 *         description: Làm mới token thành công
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt_token
 *                 refreshToken:
 *                   type: string
 *                   example: refresh_token
 *       403:
 *         description: Refresh token không hợp lệ
 *         schema:
 *           $ref: '#/definitions/Error'
 */
// Route làm mới token
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *         example: false
 *       error:
 *         type: string
 *         example: Lỗi cụ thể
 */
export default router;