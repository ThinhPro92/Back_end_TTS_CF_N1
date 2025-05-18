import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Lấy tất cả user chưa bị block
const getAll = async (req, res) => {
  try {
    const users = await User.find({ statusUser: { $ne: "banned" } }).populate("roleId");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy user theo ID
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("roleId");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo user mới (chỉ dành cho admin tạo nhân viên)
const create = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ ...rest, password: hashed });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật thông tin user
const update = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Block hoặc unblock user
const blockUser = async (req, res) => {
  try {
    const { status } = req.body; // banned hoặc active
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { statusUser: status },
      { new: true }
    );
    res.json({ message: `Đã cập nhật trạng thái: ${status}`, updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về thông tin user đang đăng nhập
const getProfile = async (req, res) => {
  res.json({
    message: "Thông tin người dùng",
    user: req.user
  });
};

export { getAll, getById, create, update, blockUser, getProfile };
