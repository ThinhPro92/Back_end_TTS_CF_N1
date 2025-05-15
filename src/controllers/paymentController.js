import Payment from "../models/Payment.js";

const getAll = async (req, res) => {
  try {
    const payments = await Payment.find({ isDeleted: false }).populate("orderId");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const saved = await newPayment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAll, create };
