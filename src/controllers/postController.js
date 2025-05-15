import Post from "../models/Post.js";

const getAll = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false }).populate("authorId");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
