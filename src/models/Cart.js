import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    variationId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariation" },
    quantity: Number,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
