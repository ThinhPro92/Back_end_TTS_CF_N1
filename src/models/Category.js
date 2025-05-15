import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên danh mục
    description: String, // Mô tả chi tiết
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // Danh mục cha
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true, // Tự động tạo createdAt & updatedAt
    versionKey: false // Tắt __v
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
