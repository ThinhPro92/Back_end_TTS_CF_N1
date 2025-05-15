import Coupon from "../models/Coupon.js";

const getAll = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isDeleted: false });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    const saved = await newCoupon.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
