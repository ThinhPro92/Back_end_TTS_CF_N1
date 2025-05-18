import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorList = errors.array().map(err => err.msg);
    return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: errorList });
  }
  next();
};

export default validate;
