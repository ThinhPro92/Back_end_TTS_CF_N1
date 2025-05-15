import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    totalAmount: Number,
    status: String,
    shippingAddress: String,
    items: [
      {
        variationId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariation" },
        quantity: Number,
        salePrice: Number
      }
    ],
    statusHistory: [
      {
        status: String,
        changedAt: Date,
        note: String
      }
    ],
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
