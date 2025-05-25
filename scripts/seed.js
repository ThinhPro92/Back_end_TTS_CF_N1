import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

// Models
import User from "../src/models/User.js";
import Role from "../src/models/Role.js";
import Brand from "../src/models/Brand.js";
import Category from "../src/models/Category.js";
import Product from "../src/models/Product.js";
import ProductVariation from "../src/models/ProductVariation.js";
import Coupon from "../src/models/Coupon.js";
import Cart from "../src/models/Cart.js";
import Order from "../src/models/Order.js";
import ProductReview from "../src/models/ProductReview.js";
import Payment from "../src/models/Payment.js";
import Post from "../src/models/Post.js";

dotenv.config();

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🌱 Connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  const now = new Date();
  const hashedPassword = await bcrypt.hash("12345678", 10);

  try {
    // Xóa dữ liệu cũ
    const deleteResults = await Promise.all([
      User.deleteMany({}),
      Role.deleteMany({}),
      Brand.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      ProductVariation.deleteMany({}),
      Coupon.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
      ProductReview.deleteMany({}),
      Payment.deleteMany({}),
      Post.deleteMany({}),
    ]);
    console.log("🧹 Old data cleared:", deleteResults.map(result => result.deletedCount));

    // Tạo vai trò
    const roles = await Role.insertMany([
      { name: "admin", description: "Quản trị viên", createdAt: now },
      { name: "staff", description: "Nhân viên", createdAt: now },
      { name: "client", description: "Khách hàng", createdAt: now },
    ]);
    console.log("✅ Roles created:", roles.length);

    // Tạo người dùng
    const users = await User.insertMany([
      {
        name: "Đàm Thịnh",
        address: "123 Hà Nội",
        phone: "0981234567",
        email: "admin@guyform.vn",
        password: hashedPassword,
        dateBirth: new Date("1999-01-01"),
        gender: "male",
        roleId: roles[0]._id, // admin
        avatarUrl: "https://via.placeholder.com/150",
        statusUser: "active",
        createdAt: now,
      },
      {
        name: "Nhân viên 1",
        address: "456 Hà Nội",
        phone: "0987654321",
        email: "staff@guyform.vn",
        password: hashedPassword,
        dateBirth: new Date("1995-05-10"),
        gender: "female",
        roleId: roles[1]._id, // staff
        avatarUrl: "https://via.placeholder.com/150",
        statusUser: "active",
        createdAt: now,
      },
      {
        name: "Khách hàng 1",
        address: "789 Hà Nội",
        phone: "0912345678",
        email: "client@guyform.vn",
        password: hashedPassword,
        dateBirth: new Date("1990-12-25"),
        gender: "male",
        roleId: roles[2]._id, // client
        avatarUrl: "https://via.placeholder.com/150",
        statusUser: "active",
        createdAt: now,
      },
    ]);
    console.log("✅ Users created:", users.length);

    // Tạo thương hiệu
    const brands = await Brand.insertMany([
      { name: "GUYFORM", description: "Thương hiệu thời trang nam", logoUrl: "https://via.placeholder.com/80", createdAt: now },
      { name: "CoolMate", description: "Thương hiệu thời trang thoải mái", logoUrl: "https://via.placeholder.com/80", createdAt: now },
    ]);
    console.log("✅ Brands created:", brands.length);

    // Tạo danh mục
    const categories = await Category.insertMany([
      { name: "Áo thun", description: "Áo cotton mát mẻ", createdAt: now },
      { name: "Quần jean", description: "Quần slim fit", createdAt: now },
      { name: "Áo sơ mi", description: "Áo sơ mi lịch lãm", createdAt: now },
    ]);
    console.log("✅ Categories created:", categories.length);

    // Tạo sản phẩm
    const products = await Product.insertMany([
      {
        name: "Áo thun GUYFORM Basic",
        descriptionShort: "Cotton cao cấp",
        descriptionLong: "Mát, thấm hút mồ hôi",
        price: 200000,
        importPrice: 100000,
        salePrice: 150000,
        flashSale_discountedPrice: 120000,
        flashSale_start: now,
        flashSale_end: new Date(now.getTime() + 86400000), // 1 ngày sau
        brandId: brands[0]._id,
        categoryId: categories[0]._id,
        totalPurchased: 10,
        status: "active",
        images: ["https://via.placeholder.com/300"],
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Quần jean CoolMate Slim",
        descriptionShort: "Jean co giãn",
        descriptionLong: "Phong cách hiện đại, thoải mái",
        price: 500000,
        importPrice: 300000,
        salePrice: 450000,
        brandId: brands[1]._id,
        categoryId: categories[1]._id,
        totalPurchased: 5,
        status: "active",
        images: ["https://via.placeholder.com/300"],
        createdAt: now,
        updatedAt: now,
      },
    ]);
    console.log("✅ Products created:", products.length);

    // Tạo biến thể sản phẩm
    const variations = await ProductVariation.insertMany([
      {
        productId: products[0]._id,
        name: "Size M - Trắng",
        sku: "SKU001",
        price: 200000,
        importPrice: 100000,
        salePrice: 150000,
        stockQuantity: 20,
        colorName: "Trắng",
        colorHexCode: "#FFFFFF",
        colorImageUrl: "https://via.placeholder.com/40",
        sizeName: "M",
        sizeDescription: "Form rộng",
        images: ["https://via.placeholder.com/300"],
        createdAt: now,
      },
      {
        productId: products[1]._id,
        name: "Size 32 - Xanh Đậm",
        sku: "SKU002",
        price: 500000,
        importPrice: 300000,
        salePrice: 450000,
        stockQuantity: 15,
        colorName: "Xanh Đậm",
        colorHexCode: "#00008B",
        colorImageUrl: "https://via.placeholder.com/40",
        sizeName: "32",
        sizeDescription: "Slim fit",
        images: ["https://via.placeholder.com/300"],
        createdAt: now,
      },
    ]);
    console.log("✅ Product Variations created:", variations.length);

    // Tạo mã giảm giá
    const coupons = await Coupon.insertMany([
      {
        code: "SUMMER20",
        description: "Giảm 20% cho đơn từ 300k",
        discountType: "percent",
        discountValue: 20,
        minOrderAmount: 300000,
        maxUsage: 100,
        usedCount: 0,
        expiresAt: new Date(now.getTime() + 7 * 86400000), // 7 ngày sau
        createdAt: now,
      },
      {
        code: "WELCOME10",
        description: "Giảm 10% cho khách mới",
        discountType: "percent",
        discountValue: 10,
        minOrderAmount: 100000,
        maxUsage: 50,
        usedCount: 0,
        expiresAt: new Date(now.getTime() + 30 * 86400000), // 30 ngày sau
        createdAt: now,
      },
    ]);
    console.log("✅ Coupons created:", coupons.length);

    // Tạo giỏ hàng
    const carts = await Cart.insertMany([
      {
        userId: users[2]._id, // client
        variationId: variations[0]._id,
        quantity: 2,
        createdAt: now,
      },
      {
        userId: users[2]._id, // client
        variationId: variations[1]._id,
        quantity: 1,
        createdAt: now,
      },
    ]);
    console.log("✅ Carts created:", carts.length);

    // Tạo đơn hàng
    const orders = await Order.insertMany([
      {
        userId: users[2]._id, // client
        totalAmount: 600000, // 2 áo thun + 1 quần jean
        couponId: coupons[0]._id, // Áp dụng mã SUMMER20
        discountAmount: 120000, // 20% của 600k
        finalAmount: 480000, // 600k - 120k
        status: "pending",
        shippingAddress: "789 Hà Nội",
        items: [
          {
            variationId: variations[0]._id,
            quantity: 2,
            salePrice: 150000,
          },
          {
            variationId: variations[1]._id,
            quantity: 1,
            salePrice: 450000,
          },
        ],
        statusHistory: [
          { status: "pending", changedAt: now, note: "Mới tạo" },
        ],
        createdAt: now,
      },
    ]);
    console.log("✅ Orders created:", orders.length);

    // Tạo đánh giá sản phẩm
    const reviews = await ProductReview.insertMany([
      {
        productId: products[0]._id,
        userId: users[2]._id, // client
        rating: 5,
        content: "Tuyệt vời, áo rất mát!",
        images: ["https://via.placeholder.com/100"],
        createdAt: now,
      },
      {
        productId: products[1]._id,
        userId: users[2]._id, // client
        rating: 4,
        content: "Quần đẹp, nhưng hơi chật",
        images: ["https://via.placeholder.com/100"],
        createdAt: now,
      },
    ]);
    console.log("✅ Product Reviews created:", reviews.length);

    // Tạo thanh toán
    const payments = await Payment.insertMany([
      {
        orderId: orders[0]._id,
        method: "momo",
        transactionCode: "MM123456789",
        amount: 480000,
        status: "success",
        createdAt: now,
      },
    ]);
    console.log("✅ Payments created:", payments.length);

    // Tạo bài viết
    const posts = await Post.insertMany([
      {
        title: "Mùa hè mặc gì cho đẹp?",
        slug: "he-dep-style",
        coverImage: "https://via.placeholder.com/300x200",
        content: "Những tips mix đồ nam mùa hè...",
        tags: ["summer", "fashion"],
        authorId: users[0]._id, // admin
        published: true,
        createdAt: now,
      },
      {
        title: "Top 5 mẫu áo thun hot 2025",
        slug: "top-ao-thun-2025",
        coverImage: "https://via.placeholder.com/300x200",
        content: "Cùng khám phá những mẫu áo thun hot nhất 2025...",
        tags: ["fashion", "trending"],
        authorId: users[0]._id, // admin
        published: true,
        createdAt: now,
      },
    ]);
    console.log("✅ Posts created:", posts.length);

    console.log("✅ All seed data inserted successfully.");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  } finally {
    // Đóng kết nối MongoDB
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed.");
    process.exit(0);
  }
};

// Chạy seeding
seedData();