import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["admin", "staff", "client"], required: true },
    description: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
