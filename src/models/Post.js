import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    coverImage: String,
    content: String,
    tags: [String],
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    published: Boolean,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
