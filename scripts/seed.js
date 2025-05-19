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
await mongoose.connect(process.env.DB_URI);
console.log("🌱 Connected to MongoDB");

const now = new Date();
const hashedPassword = await bcrypt.hash("12345678", 10);

try {
  // Clear old data
  await Promise.all([
    User.deleteMany(),
    Role.deleteMany(),
    Brand.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    ProductVariation.deleteMany(),
    Coupon.deleteMany(),
    Cart.deleteMany(),
    Order.deleteMany(),
    ProductReview.deleteMany(),
    Payment.deleteMany(),
    Post.deleteMany()
  ]);
  console.log("🧹 Old data cleared");

  // Roles
  const roles = await Role.insertMany([
    { name: "admin", description: "Quản trị viên", createdAt: now },
    { name: "staff", description: "Nhân viên", createdAt: now },
    { name: "client", description: "Khách hàng", createdAt: now }
  ]);

  // Users
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
      createdAt: now
    }
  ]);

  const brands = await Brand.insertMany([
    { name: "GUYFORM", description: "Thương hiệu thời trang nam", logoUrl: "https://via.placeholder.com/80", createdAt: now }
  ]);

  const categories = await Category.insertMany([
    { name: "Áo thun", description: "Áo cotton mát mẻ", createdAt: now },
    { name: "Quần jean", description: "Slim fit", createdAt: now }
  ]);

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
      flashSale_end: new Date(now.getTime() + 86400000),
      brandId: brands[0]._id,
      categoryId: categories[0]._id,
      totalPurchased: 10,
      status: "active",
      images: ["https://via.placeholder.com/300"],
      createdAt: now,
      updatedAt: now
    }
  ]);

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
      createdAt: now
    }
  ]);

  await Coupon.insertMany([
    {
      code: "SUMMER20",
      description: "Giảm 20%",
      discountType: "percent",
      discountValue: 20,
      minOrderAmount: 300000,
      maxUsage: 100,
      usedCount: 0,
      expiresAt: new Date(now.getTime() + 7 * 86400000),
      createdAt: now
    }
  ]);

  await Cart.insertMany([
    {
      userId: users[0]._id,
      variationId: variations[0]._id,
      quantity: 2,
      createdAt: now
    }
  ]);

  const orders = await Order.insertMany([
    {
      userId: users[0]._id,
      totalAmount: 300000,
      status: "pending",
      shippingAddress: "123 Hà Nội",
      items: [
        {
          variationId: variations[0]._id,
          quantity: 2,
          salePrice: 150000
        }
      ],
      statusHistory: [
        { status: "pending", changedAt: now, note: "Mới tạo" }
      ],
      createdAt: now
    }
  ]);

  await ProductReview.insertMany([
    {
      productId: products[0]._id,
      userId: users[0]._id,
      rating: 5,
      content: "Tuyệt vời!",
      images: ["https://via.placeholder.com/100"],
      createdAt: now
    }
  ]);

  await Payment.insertMany([
    {
      orderId: orders[0]._id,
      method: "momo",
      transactionCode: "MM123456789",
      status: "success",
      createdAt: now
    }
  ]);

  await Post.insertMany([
    {
      title: "Mùa hè mặc gì cho đẹp?",
      slug: "he-dep-style",
      coverImage: "https://via.placeholder.com/300x200",
      content: "Những tips mix đồ nam mùa hè...",
      tags: ["summer", "fashion"],
      authorId: users[0]._id,
      published: true,
      createdAt: now
    }
  ]);

  console.log("✅ All seed data inserted successfully.");
  process.exit();
} catch (err) {
  console.error("❌ Error seeding data:", err);
  process.exit(1);
}
