import Brand from "../models/Brand.js";

// Lấy danh sách thương hiệu
const getAll = async (req, res) => {
  try {
    const brands = await Brand.find({ isDeleted: false });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết thương hiệu theo ID
const getById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand || brand.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
    }
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo thương hiệu mới
const create = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const saved = await newBrand.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật thương hiệu
const update = async (req, res) => {
  try {
    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xoá mềm thương hiệu
const softDelete = async (req, res) => {
  try {
    const deleted = await Brand.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    res.json({ message: "Đã xoá thương hiệu", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, getById, create, update, softDelete };
