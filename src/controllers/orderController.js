import Order from "../models/Order.js";

const getAll = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: false }).populate("userId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
