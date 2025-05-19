import Product from "../models/Product.js";

// GET - Danh sách sản phẩm (có lọc & phân trang)
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, brandId, categoryId } = req.query;

    const filter = { isDeleted: false };
    if (brandId) filter.brandId = brandId;
    if (categoryId) filter.categoryId = categoryId;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate("brandId categoryId")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Tạo sản phẩm mới
const create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET - Chi tiết sản phẩm theo ID
const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("brandId categoryId");

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT - Cập nhật sản phẩm
const update = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Xoá mềm sản phẩm
const softDelete = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    res.json({ message: "Đã xoá sản phẩm", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// khoi phuc san pham
const restore = async (req, res) => {
  try {
    const restored = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );
    if (!restored) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json({ message: "Khôi phục thành công", restored });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deletePermanently = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để xoá" });
    }
    res.json({ message: "Đã xoá vĩnh viễn sản phẩm", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAll, create, getById, update, softDelete, restore, deletePermanently };
