import mongoose from "mongoose";

const productVariationSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    sku: String,
    price: Number,
    importPrice: Number,
    salePrice: Number,
    stockQuantity: Number,
    colorName: String,
    colorHexCode: String,
    colorImageUrl: String,
    sizeName: String,
    sizeDescription: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ProductVariation = mongoose.model("ProductVariation", productVariationSchema);
export default ProductVariation;
