import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    email: { type: String, unique: true },
    password: String,
    dateBirth: Date,
    gender: { type: String, enum: ["male", "female", "other"] },
    statusUser: { type: String, default: "active" },
    avatarUrl: String,
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const User = mongoose.model("User", userSchema);
export default User;
