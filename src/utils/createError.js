// Tạo lỗi tùy chỉnh
const createError = (statusCode, message) => {
  const error = new Error(message || "Lỗi máy chủ nội bộ");
  error.statusCode = statusCode || 500;
  return error;
};

export default createError;