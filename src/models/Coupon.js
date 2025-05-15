import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true }, // Mã giảm giá
    description: String,
    discountType: { type: String, enum: ["percent", "fixed"] },
    discountValue: Number,
    minOrderAmount: Number,
    maxUsage: Number,
    usedCount: { type: Number, default: 0 },
    expiresAt: Date,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
