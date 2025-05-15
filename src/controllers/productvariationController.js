import ProductVariation from "../models/ProductVariation.js";

const getAll = async (req, res) => {
  try {
    const variations = await ProductVariation.find({ isDeleted: false }).populate("productId");
    res.json(variations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newVariation = new ProductVariation(req.body);
    const saved = await newVariation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
