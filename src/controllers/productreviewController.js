import ProductReview from "../models/ProductReview.js";

const getAll = async (req, res) => {
  try {
    const reviews = await ProductReview.find({ isDeleted: false }).populate("userId productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newReview = new ProductReview(req.body);
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
