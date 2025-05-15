import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    addedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
