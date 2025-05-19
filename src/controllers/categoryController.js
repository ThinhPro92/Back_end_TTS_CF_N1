import Category from "../models/Category.js";

// GET - Lấy tất cả danh mục chưa xoá
const getAll = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Lấy chi tiết 1 danh mục theo ID
const getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category || category.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Tạo mới danh mục
const create = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Cập nhật danh mục
const update = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Xoá mềm danh mục
const softDelete = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    res.json({ message: "Đã xoá danh mục", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, getById, create, update, softDelete };
