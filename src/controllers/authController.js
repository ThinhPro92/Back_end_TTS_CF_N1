import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  RESET_PASSWORD_SECRET,
  RESET_PASSWORD_EXPIRES,
  FRONTEND_URL
} from '../configs/enviroments.js';
import { sendEmail } from '../utils/sendMail.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import crypto from 'crypto';

// Đăng ký người dùng
export const register = async (req, res) => {
  try {
    const { email, password, name, roleId } = req.body;

    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(errorResponse('Email đã tồn tại'));
    }

    // Mã hóa mật khẩu
    const hashed = await bcrypt.hash(password, 10);
    // Gán vai trò mặc định là client nếu không có roleId
    const defaultRole = roleId || (await Role.findOne({ name: 'client' }))?._id;
    if (!defaultRole) {
      return res.status(400).json(errorResponse('Vai trò mặc định không tồn tại'));
    }

    // Tạo người dùng mới
    const user = new User({ email, name, password: hashed, roleId: defaultRole });
    const savedUser = await user.save();

    // Tạo token truy cập
    const accessToken = jwt.sign(
      { id: savedUser._id, role: { name: savedUser.roleId?.name || 'client' } },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json(
      successResponse('Đăng ký thành công', {
        message: 'Tài khoản đã được tạo thành công',
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.roleId?.name || 'client'
        },
        token: accessToken
      })
    );
  } catch (err) {
    return res.status(400).json(errorResponse(err.message));
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ email }).populate('roleId');
    if (!user) {
      return res.status(404).json(errorResponse('Không tìm thấy người dùng'));
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(errorResponse('Sai mật khẩu'));
    }

    // Tạo token truy cập và làm mới
    const accessToken = jwt.sign({ id: user._id, role: { name: user.roleId?.name || 'client' } }, JWT_SECRET, {
      expiresIn: '1d'
    });
    const refreshToken = jwt.sign({ id: user._id, role: { name: user.roleId?.name || 'client' } }, JWT_REFRESH_SECRET, {
      expiresIn: '60d'
    });

    return res.json(
      successResponse('Đăng nhập thành công', {
        token: accessToken,
        refreshToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.roleId?.name || 'client'
        }
      })
    );
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

// Đăng xuất
export const logout = (req, res) => {
  return res.json(successResponse('Đăng xuất thành công'));
};

// Quên mật khẩu
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(errorResponse('Không tìm thấy người dùng'));
    }

    // Tạo mã ngẫu nhiên
    const resetCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    // Mã hóa mã vào token
    const resetToken = jwt.sign({ id: user._id, code: resetCode }, RESET_PASSWORD_SECRET, {
      expiresIn: RESET_PASSWORD_EXPIRES
    });

    // Gửi email chứa mã
    await sendEmail(
      email,
      'Mã đặt lại mật khẩu',
      `Mã đặt lại mật khẩu của bạn là: ${resetCode}. Vui lòng nhập mã này để đặt lại mật khẩu. Liên kết: ${FRONTEND_URL}/reset-password?token=${resetToken}`,
      `<p>Mã đặt lại mật khẩu của bạn là: <strong>${resetCode}</strong>.</p>
       <p>Vui lòng sử dụng mã này hoặc truy cập <a href="${FRONTEND_URL}/reset-password?token=${resetToken}">liên kết này</a> để đặt lại mật khẩu. Mã sẽ hết hạn sau ${RESET_PASSWORD_EXPIRES}.</p>`
    );

    return res.json(
      successResponse('Email chứa mã đặt lại mật khẩu đã được gửi', {
        message: 'Email chứa mã đặt lại mật khẩu đã được gửi',
        resetToken
      })
    );
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

// Kiểm tra mã đặt lại mật khẩu
export const verifyResetCode = async (req, res) => {
  try {
    const { token, code } = req.body;

    // Xác minh token
    const decoded = jwt.verify(token, RESET_PASSWORD_SECRET);
    if (decoded.code !== code) {
      return res.status(400).json(errorResponse('Mã đặt lại mật khẩu không đúng'));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json(errorResponse('Người dùng không tồn tại'));
    }

    return res.json(
      successResponse('Mã đặt lại mật khẩu hợp lệ', {
        message: 'Mã đặt lại mật khẩu hợp lệ',
        userId: user._id
      })
    );
  } catch (err) {
    return res.status(400).json(errorResponse('Token hoặc mã không hợp lệ hoặc đã hết hạn'));
  }
};

// Đặt lại mật khẩu (sau khi xác minh mã)
export const resetPassword = async (req, res) => {
  try {
    const { token, code, password } = req.body;

    // Xác minh token và mã
    const decoded = jwt.verify(token, RESET_PASSWORD_SECRET);
    if (decoded.code !== code) {
      return res.status(400).json(errorResponse('Mã đặt lại mật khẩu không đúng'));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json(errorResponse('Người dùng không tồn tại'));
    }

    // Mã hóa mật khẩu mới
    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    return res.json(
      successResponse('Mật khẩu đã được đặt lại thành công', {
        message: 'Mật khẩu đã được đặt lại thành công'
      })
    );
  } catch (err) {
    return res.status(400).json(errorResponse('Token hoặc mã không hợp lệ hoặc đã hết hạn'));
  }
};

// Đổi mật khẩu (yêu cầu mật khẩu cũ)
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?._id; // Sửa từ req.user?.id thành req.user?._id

    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(errorResponse('Người dùng không tồn tại'));
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json(errorResponse('Mật khẩu cũ không đúng'));
    }

    // Mã hóa mật khẩu mới
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.json(
      successResponse('Mật khẩu đã được đổi thành công', {
        message: 'Mật khẩu đã được đổi thành công'
      })
    );
  } catch (err) {
    return res.status(400).json(errorResponse(err.message));
  }
};

// Làm mới token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json(errorResponse('Không tìm thấy refresh token'));
    }

    // Xác minh refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).populate('roleId');
    if (!user) {
      return res.status(404).json(errorResponse('Người dùng không tồn tại'));
    }

    // Tạo token truy cập mới
    const accessToken = jwt.sign({ id: user._id, role: { name: user.roleId?.name || 'client' } }, JWT_SECRET, {
      expiresIn: '1d'
    });

    return res.json(
      successResponse('Làm mới token thành công', {
        token: accessToken,
        refreshToken
      })
    );
  } catch (err) {
    return res.status(403).json(errorResponse('Refresh token không hợp lệ'));
  }
};