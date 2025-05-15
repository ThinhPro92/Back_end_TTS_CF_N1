import User from "../models/User.js";

// Lấy danh sách user chưa bị xoá mềm
const getAll = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo user mới
const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
