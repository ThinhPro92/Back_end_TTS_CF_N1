import express from "express";

// Import tất cả các routes
import userRoutes from "./user.route.js";
import roleRoutes from "./role.route.js";
import brandRoutes from "./brand.route.js";
import categoryRoutes from "./category.route.js";
import productRoutes from "./product.route.js";
import variationRoutes from "./productvariation.route.js";
import wishlistRoutes from "./wishlist.route.js";
import reviewRoutes from "./productreview.route.js";
import cartRoutes from "./cart.route.js";
import orderRoutes from "./order.route.js";
import paymentRoutes from "./payment.route.js";
import couponRoutes from "./coupon.route.js";
import postRoutes from "./post.route.js";
import authRoutes from "./auth.route.js";

// Middleware xử lý lỗi JSON sai cấu trúc
import jsonInvalid from "../middlewares/jsonInvalid.js";
// Middleware bắt route không tồn tại
import notFoundHandler from "../middlewares/notFoundHandler.js";

const router = express.Router();

// CÁC ROUTE CHÍNH
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/variations", variationRoutes);
router.use("/wishlists", wishlistRoutes);
router.use("/reviews", reviewRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/coupons", couponRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);

// Test Route sống sót
router.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>GUYFORM</title></head>
      <body>
        <h1>Đàm Thịnh - GUYFORM is alive 💪</h1>
      </body>
    </html>
  `);
});

// Middleware xử lý JSON không hợp lệ
router.use(jsonInvalid);

// Middleware xử lý route không tồn tại (404)
router.use("*", notFoundHandler);

export default router;
