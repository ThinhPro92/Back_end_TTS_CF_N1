import createError from "./createError.js";

// Xử lý bất đồng bộ và bắt lỗi
const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => next(createError(500, error.message || "Đã xảy ra lỗi")));
};

export default handleAsync;