import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    descriptionShort: String,
    descriptionLong: String,
    price: Number,
    importPrice: Number,
    salePrice: Number,
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    flashSale_discountedPrice: Number,
    flashSale_start: Date,
    flashSale_end: Date,
    images: [String],
    totalPurchased: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "hidden", "sold_out"],
      default: "active"
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
