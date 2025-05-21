import createError from "../utils/createError.js";
import handleAsync from "../utils/handleAsync.js";

// Middleware kiểm tra quyền admin
export const isAdmin = handleAsync(async (req, res, next) => {
  if (req.user?.role?.name !== "admin") {
    return next(createError(403, "Bạn không có quyền truy cập, chỉ Admin mới có quyền này"));
  }
  next();
});

// Middleware kiểm tra quyền client
export const isClient = handleAsync(async (req, res, next) => {
  if (req.user?.role?.name !== "client") {
    return next(createError(403, "Bạn không có quyền truy cập, chỉ Khách hàng mới có quyền này"));
  }
  next();
});

// Middleware kiểm tra quyền admin hoặc client
export const isAdminOrClient = handleAsync(async (req, res, next) => {
  const role = req.user?.role?.name;
  if (!["admin", "client"].includes(role)) {
    return next(createError(403, "Bạn không có quyền truy cập"));
  }
  next();
});

// Middleware kiểm tra vai trò tùy chỉnh
export const checkRole = (roles) => handleAsync(async (req, res, next) => {
  const role = req.user?.role?.name;
  if (!role || !roles.includes(role)) {
    return next(createError(403, `Bạn không có quyền truy cập, chỉ các vai trò ${roles.join(", ")} được phép`));
  }
  next();
});