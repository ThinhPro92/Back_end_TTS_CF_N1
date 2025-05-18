import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/enviroments.js";

// Đăng ký
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, name, password: hashed });

    await user.save();
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("roleId");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu" });

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Đăng nhập thành công",
      token: accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.roleId?.name || "client"
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng xuất
export const logout = (req, res) => {
  res.json({ message: "Đăng xuất thành công" });
};

// Quên mật khẩu
export const forgotPassword = async (req, res) => {
  res.status(501).json({ message: "Tính năng đang phát triển" });
};

// Reset mật khẩu
export const resetPassword = async (req, res) => {
  res.status(501).json({ message: "Tính năng đang phát triển" });
};
