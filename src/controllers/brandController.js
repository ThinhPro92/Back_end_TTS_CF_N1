import Brand from "../models/Brand.js";
import { successResponse, errorResponse } from "../utils/responseFormatter.js";

// Lấy danh sách thương hiệu (hỗ trợ tìm kiếm và phân trang)
const getBrands = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    const filter = { isDeleted: false };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Brand.countDocuments(filter);
    const brands = await Brand.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return res.json(
      successResponse("Lấy danh sách thương hiệu thành công", {
        total,
        page: Number(page),
        limit: Number(limit),
        brands,
      })
    );
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

// Lấy chi tiết thương hiệu theo ID
const getById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand || brand.isDeleted) {
      return res.status(404).json(errorResponse("Không tìm thấy thương hiệu"));
    }

    return res.json(
      successResponse("Lấy chi tiết thương hiệu thành công", brand)
    );
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

// Tạo thương hiệu mới
const create = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const saved = await newBrand.save();
    return res.status(201).json(
      successResponse("Tạo thương hiệu thành công", saved)
    );
  } catch (err) {
    return res.status(400).json(errorResponse(err.message));
  }
};

// Cập nhật thương hiệu
const update = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand || brand.isDeleted) {
      return res.status(404).json(errorResponse("Không tìm thấy thương hiệu"));
    }

    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(
      successResponse("Cập nhật thương hiệu thành công", updated)
    );
  } catch (err) {
    return res.status(400).json(errorResponse(err.message));
  }
};

// Xóa mềm thương hiệu
const softDelete = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand || brand.isDeleted) {
      return res.status(404).json(errorResponse("Không tìm thấy thương hiệu"));
    }

    const deleted = await Brand.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    return res.json(
      successResponse("Đã xóa thương hiệu", { deleted })
    );
  } catch (err) {
    return res.status(400).json(errorResponse(err.message));
  }
};

// Khôi phục thương hiệu
const restore = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json(errorResponse("Không tìm thấy thương hiệu"));
    }
    if (!brand.isDeleted) {
      return res.status(400).json(errorResponse("Thương hiệu chưa bị xóa mềm"));
    }

    const restored = await Brand.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );
    return res.json(
      successResponse("Khôi phục thương hiệu thành công", { restored })
    );
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

// Xóa vĩnh viễn thương hiệu
const deletePermanently = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json(errorResponse("Không tìm thấy thương hiệu để xóa"));
    }

    const deleted = await Brand.findByIdAndDelete(req.params.id);
    return res.json(
      successResponse("Đã xóa vĩnh viễn thương hiệu", { deleted })
    );
  } catch (err) {
    return res.status(500).json(errorResponse(err.message));
  }
};

export { getBrands, getById, create, update, softDelete, restore, deletePermanently };