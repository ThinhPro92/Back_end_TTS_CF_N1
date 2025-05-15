import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    method: String,
    transactionCode: String,
    status: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
