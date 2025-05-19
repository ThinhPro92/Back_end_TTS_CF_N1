import createError from "../utils/createError.js";

const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role || !roles.includes(req.user.role.name)) {
      return next(createError(403, "Bạn không có quyền truy cập chức năng này"));
    }
    next();
  };
};

export default checkRole;
