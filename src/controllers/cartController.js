import Cart from "../models/Cart.js";

const getAll = async (req, res) => {
  try {
    const carts = await Cart.find({ isDeleted: false }).populate("userId variationId");
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const saved = await newCart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
