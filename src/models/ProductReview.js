import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    content: String,
    images: [String],
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ProductReview = mongoose.model("ProductReview", productReviewSchema);
export default ProductReview;
