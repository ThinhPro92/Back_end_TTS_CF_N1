import Wishlist from "../models/Wishlist.js";

const getAll = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ isDeleted: false }).populate("userId productId");
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newItem = new Wishlist(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
