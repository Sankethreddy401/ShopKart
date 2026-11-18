require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const app = express();

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/shopkart";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "shopkart-secret-2026";

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

/* =====================================================
   PRODUCT
===================================================== */

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    colors: {
      type: [String],
      default: ["Black"],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

/* =====================================================
   USER
===================================================== */

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          default: 1,
        },

        color: {
          type: String,
          default: "Black",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

/* =====================================================
   ORDER
===================================================== */

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,

        image: String,

        price: Number,

        quantity: Number,

        color: {
          type: String,
          default: "Black",
        },
      },
    ],

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    subtotal: Number,

    delivery: Number,

    total: Number,

    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: [
        "PLACED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PLACED",
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);

/* =====================================================
   JWT
===================================================== */

function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

/* =====================================================
   AUTH MIDDLEWARE
===================================================== */

async function auth(req, res, next) {
  try {
    const header =
      req.headers.authorization;

    if (
      !header ||
      !header.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const token =
      header.substring(7);

    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message:
        "Invalid or expired token",
    });
  }
}

/* =====================================================
   ADMIN MIDDLEWARE
===================================================== */

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
}

/* =====================================================
   BASIC
===================================================== */

app.get("/", (req, res) => {
  res.json({
    app: "ShopKart",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",

    database:
      mongoose.connection.readyState === 1
        ? "MongoDB Connected"
        : "MongoDB Disconnected",
  });
});

/* =====================================================
   REGISTER
===================================================== */

app.post(
  "/api/auth/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message:
            "Password must contain at least 6 characters",
        });
      }

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const existing =
        await User.findOne({
          email: cleanEmail,
        });

      if (existing) {
        return res.status(409).json({
          message:
            "Email already registered",
        });
      }

      const hashed =
        await bcrypt.hash(
          password,
          12
        );

      const user =
        await User.create({
          name: name.trim(),

          email: cleanEmail,

          password: hashed,
        });

      res.status(201).json({
        message:
          "Registration successful",

        token:
          createToken(user),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* =====================================================
   LOGIN
===================================================== */

app.post(
  "/api/auth/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email:
            String(email)
              .trim()
              .toLowerCase(),
        });

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      const valid =
        await bcrypt.compare(
          password || "",
          user.password
        );

      if (!valid) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      res.json({
        message:
          "Login successful",

        token:
          createToken(user),

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* =====================================================
   CURRENT USER
===================================================== */

app.get(
  "/api/auth/me",
  auth,
  async (req, res) => {
    const user =
      await User.findById(
        req.user._id
      )
        .populate("wishlist")
        .populate("cart.product");

    res.json({
      user,
    });
  }
);

/* =====================================================
   PRODUCTS
===================================================== */

app.get(
  "/api/products",
  async (req, res) => {
    try {
      const {
        search,
        category,
        minPrice,
        maxPrice,
        sort,
        featured,
      } = req.query;

      const filter = {
        active: true,
      };

      if (
        category &&
        category !== "All"
      ) {
        filter.category =
          category;
      }

      if (search) {
        filter.$or = [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },

          {
            brand: {
              $regex: search,
              $options: "i",
            },
          },

          {
            category: {
              $regex: search,
              $options: "i",
            },
          },

          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
        ];
      }

      if (
        minPrice !== undefined ||
        maxPrice !== undefined
      ) {
        filter.price = {};

        if (minPrice) {
          filter.price.$gte =
            Number(minPrice);
        }

        if (maxPrice) {
          filter.price.$lte =
            Number(maxPrice);
        }
      }

      if (featured === "true") {
        filter.featured = true;
      }

      let query =
        Product.find(filter);

      if (
        sort === "price_low"
      ) {
        query.sort({
          price: 1,
        });
      } else if (
        sort === "price_high"
      ) {
        query.sort({
          price: -1,
        });
      } else if (
        sort === "rating"
      ) {
        query.sort({
          rating: -1,
        });
      } else {
        query.sort({
          createdAt: -1,
        });
      }

      const products =
        await query;

      res.json({
        count:
          products.length,

        products,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* =====================================================
   CATEGORIES
===================================================== */

app.get(
  "/api/products/categories",
  async (req, res) => {
    try {
      const categories =
        await Product.distinct(
          "category",
          {
            active: true,
          }
        );

      res.json({
        categories: [
          "All",
          ...categories,
        ],
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* =====================================================
   PRODUCT DETAILS
===================================================== */

app.get(
  "/api/products/:id",
  async (req, res) => {
    try {
      const product =
        await Product.findOne({
          _id: req.params.id,
          active: true,
        });

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.json({
        product,
      });
    } catch (error) {
      res.status(400).json({
        message:
          "Invalid product ID",
      });
    }
  }
);

/* =====================================================
   CART
===================================================== */

app.get(
  "/api/cart",
  auth,
  async (req, res) => {
    const user =
      await User.findById(
        req.user._id
      ).populate(
        "cart.product"
      );

    res.json({
      cart:
        user.cart,
    });
  }
);

app.post(
  "/api/cart",
  auth,
  async (req, res) => {
    try {
      const {
        productId,
        quantity = 1,
        color = "Black",
      } = req.body;

      const product =
        await Product.findById(
          productId
        );

      if (
        !product ||
        !product.active
      ) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      const qty =
        Number(quantity);

      if (
        !Number.isInteger(qty) ||
        qty < 1
      ) {
        return res.status(400).json({
          message:
            "Invalid quantity",
        });
      }

      const selectedColor =
        String(color);

      if (
        product.colors.length > 0 &&
        !product.colors.includes(
          selectedColor
        )
      ) {
        return res.status(400).json({
          message:
            "Selected color is not available",
        });
      }

      const existing =
        req.user.cart.find(
          (item) =>
            item.product.toString() ===
              productId &&
            item.color ===
              selectedColor
        );

      const newQuantity =
        existing
          ? existing.quantity + qty
          : qty;

      if (
        newQuantity >
        product.stock
      ) {
        return res.status(400).json({
          message:
            "Not enough stock",
        });
      }

      if (existing) {
        existing.quantity =
          newQuantity;
      } else {
        req.user.cart.push({
          product:
            productId,

          quantity:
            qty,

          color:
            selectedColor,
        });
      }

      await req.user.save();

      const updated =
        await User.findById(
          req.user._id
        ).populate(
          "cart.product"
        );

      res.json({
        message:
          "Product added to cart",

        cart:
          updated.cart,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

app.patch(
  "/api/cart/:productId",
  auth,
  async (req, res) => {
    try {
      const {
        quantity,
        color,
      } = req.body;

      const item =
        req.user.cart.find(
          (item) =>
            item.product.toString() ===
              req.params.productId &&
            (!color ||
              item.color === color)
        );

      if (!item) {
        return res.status(404).json({
          message:
            "Cart item not found",
        });
      }

      const product =
        await Product.findById(
          req.params.productId
        );

      if (
        quantity < 1 ||
        quantity >
          product.stock
      ) {
        return res.status(400).json({
          message:
            "Invalid quantity",
        });
      }

      item.quantity =
        Number(quantity);

      await req.user.save();

      res.json({
        message:
          "Cart updated",

        cart:
          req.user.cart,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

app.delete(
  "/api/cart/:productId",
  auth,
  async (req, res) => {
    const color =
      req.query.color;

    req.user.cart =
      req.user.cart.filter(
        (item) =>
          !(
            item.product.toString() ===
              req.params.productId &&
            (!color ||
              item.color === color)
          )
      );

    await req.user.save();

    res.json({
      message:
        "Cart item removed",

      cart:
        req.user.cart,
    });
  }
);

app.delete(
  "/api/cart",
  auth,
  async (req, res) => {
    req.user.cart = [];

    await req.user.save();

    res.json({
      message:
        "Cart cleared",
    });
  }
);

/* =====================================================
   WISHLIST
===================================================== */

app.get(
  "/api/wishlist",
  auth,
  async (req, res) => {
    const user =
      await User.findById(
        req.user._id
      ).populate(
        "wishlist"
      );

    res.json({
      wishlist:
        user.wishlist,
    });
  }
);

app.post(
  "/api/wishlist/:productId",
  auth,
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.productId
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      const exists =
        req.user.wishlist.some(
          (id) =>
            id.toString() ===
            req.params.productId
        );

      if (exists) {
        req.user.wishlist =
          req.user.wishlist.filter(
            (id) =>
              id.toString() !==
              req.params.productId
          );
      } else {
        req.user.wishlist.push(
          req.params.productId
        );
      }

      await req.user.save();

      res.json({
        message:
          exists
            ? "Removed from wishlist"
            : "Added to wishlist",

        wishlist:
          req.user.wishlist,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* =====================================================
   COD CHECKOUT
===================================================== */

app.post(
  "/api/orders",
  auth,
  async (req, res) => {
    try {
      const {
        shippingAddress,
        paymentMethod = "COD",
      } = req.body;

      if (
        !shippingAddress ||
        !shippingAddress.name ||
        !shippingAddress.phone ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.pincode
      ) {
        return res.status(400).json({
          message:
            "Complete shipping address is required",
        });
      }

      if (
        paymentMethod !== "COD"
      ) {
        return res.status(400).json({
          message:
            "Use Razorpay payment API for online payment",
        });
      }

      const user =
        await User.findById(
          req.user._id
        ).populate(
          "cart.product"
        );

      if (!user.cart.length) {
        return res.status(400).json({
          message:
            "Cart is empty",
        });
      }

      const items = [];

      let subtotal = 0;

      for (
        const cartItem of user.cart
      ) {
        const product =
          cartItem.product;

        if (!product) {
          return res.status(400).json({
            message:
              "Product unavailable",
          });
        }

        if (
          product.stock <
          cartItem.quantity
        ) {
          return res.status(400).json({
            message:
              "Insufficient stock for " +
              product.name,
          });
        }

        items.push({
          product:
            product._id,

          name:
            product.name,

          image:
            product.image,

          price:
            product.price,

          quantity:
            cartItem.quantity,

          color:
            cartItem.color,
        });

        subtotal +=
          product.price *
          cartItem.quantity;
      }

      const delivery =
        subtotal >= 500
          ? 0
          : 50;

      const total =
        subtotal + delivery;

      const order =
        await Order.create({
          user:
            user._id,

          items,

          shippingAddress,

          subtotal,

          delivery,

          total,

          paymentMethod:
            "COD",

          paymentStatus:
            "PENDING",

          orderStatus:
            "PLACED",
        });

      for (
        const cartItem of user.cart
      ) {
        await Product.findByIdAndUpdate(
          cartItem.product._id,
          {
            $inc: {
              stock:
                -cartItem.quantity,
            },
          }
        );
      }

      user.cart = [];

      await user.save();

      res.status(201).json({
        message:
          "COD order placed successfully",

        order,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

/* =====================================================
   USER ORDERS
===================================================== */

app.get(
  "/api/orders",
  auth,
  async (req, res) => {
    const orders =
      await Order.find({
        user:
          req.user._id,
      })
        .populate(
          "items.product"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      orders,
    });
  }
);

app.get(
  "/api/orders/:id",
  auth,
  async (req, res) => {
    const order =
      await Order.findOne({
        _id:
          req.params.id,

        user:
          req.user._id,
      }).populate(
        "items.product"
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found",
      });
    }

    res.json({
      order,
    });
  }
);

/* =====================================================
   CANCEL ORDER
===================================================== */

app.patch(
  "/api/orders/:id/cancel",
  auth,
  async (req, res) => {
    const order =
      await Order.findOne({
        _id:
          req.params.id,

        user:
          req.user._id,
      });

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found",
      });
    }

    if (
      [
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ].includes(
        order.orderStatus
      )
    ) {
      return res.status(400).json({
        message:
          "Order cannot be cancelled now",
      });
    }

    order.orderStatus =
      "CANCELLED";

    await order.save();

    res.json({
      message:
        "Order cancelled",

      order,
    });
  }
);

/* =====================================================
   RAZORPAY CREATE ORDER
===================================================== */

app.post(
  "/api/payments/create-order",
  auth,
  async (req, res) => {
    try {
      if (
        !process.env.RAZORPAY_KEY_ID ||
        !process.env.RAZORPAY_KEY_SECRET
      ) {
        return res.status(503).json({
          message:
            "Razorpay keys are not configured",
        });
      }

      const user =
        await User.findById(
          req.user._id
        ).populate(
          "cart.product"
        );

      if (!user.cart.length) {
        return res.status(400).json({
          message:
            "Cart is empty",
        });
      }

      let subtotal = 0;

      for (
        const item of user.cart
      ) {
        if (!item.product) {
          return res.status(400).json({
            message:
              "Product not found",
          });
        }

        subtotal +=
          item.product.price *
          item.quantity;
      }

      const delivery =
        subtotal >= 500
          ? 0
          : 50;

      const total =
        subtotal + delivery;

      const razorpay =
        new Razorpay({
          key_id:
            process.env
              .RAZORPAY_KEY_ID,

          key_secret:
            process.env
              .RAZORPAY_KEY_SECRET,
        });

      const paymentOrder =
        await razorpay.orders.create({
          amount:
            Math.round(
              total * 100
            ),

          currency:
            "INR",

          receipt:
            "SHOPKART_" +
            Date.now(),
        });

      res.json({
        success: true,

        keyId:
          process.env
            .RAZORPAY_KEY_ID,

        orderId:
          paymentOrder.id,

        amount:
          paymentOrder.amount,

        currency:
          "INR",

        total,
      });
    } catch (error) {
      console.error(
        "Razorpay error:",
        error
      );

      res.status(500).json({
        message:
          "Unable to create payment",
      });
    }
  }
);

/* =====================================================
   RAZORPAY VERIFY
===================================================== */

app.post(
  "/api/payments/verify",
  auth,
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        shippingAddress,
      } = req.body;

      if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
      ) {
        return res.status(400).json({
          message:
            "Payment details are incomplete",
        });
      }

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
              "|" +
              razorpay_payment_id
          )
          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          message:
            "Payment verification failed",
        });
      }

      const user =
        await User.findById(
          req.user._id
        ).populate(
          "cart.product"
        );

      if (!user.cart.length) {
        return res.status(400).json({
          message:
            "Cart is empty",
        });
      }

      const items = [];

      let subtotal = 0;

      for (
        const cartItem of user.cart
      ) {
        const product =
          cartItem.product;

        if (!product) {
          return res.status(400).json({
            message:
              "Product unavailable",
          });
        }

        if (
          product.stock <
          cartItem.quantity
        ) {
          return res.status(400).json({
            message:
              "Insufficient stock",
          });
        }

        items.push({
          product:
            product._id,

          name:
            product.name,

          image:
            product.image,

          price:
            product.price,

          quantity:
            cartItem.quantity,

          color:
            cartItem.color,
        });

        subtotal +=
          product.price *
          cartItem.quantity;
      }

      const delivery =
        subtotal >= 500
          ? 0
          : 50;

      const total =
        subtotal + delivery;

      const order =
        await Order.create({
          user:
            user._id,

          items,

          shippingAddress,

          subtotal,

          delivery,

          total,

          paymentMethod:
            "RAZORPAY",

          paymentStatus:
            "PAID",

          orderStatus:
            "CONFIRMED",

          razorpayOrderId:
            razorpay_order_id,

          razorpayPaymentId:
            razorpay_payment_id,
        });

      for (
        const cartItem of user.cart
      ) {
        await Product.findByIdAndUpdate(
          cartItem.product._id,
          {
            $inc: {
              stock:
                -cartItem.quantity,
            },
          }
        );
      }

      user.cart = [];

      await user.save();

      res.json({
        success: true,

        message:
          "Payment successful",

        order,
      });
    } catch (error) {
      console.error(
        "Payment verification error:",
        error
      );

      res.status(500).json({
        message:
          "Payment verification failed",
      });
    }
  }
);

/* =====================================================
   ADMIN STATS
===================================================== */

app.get(
  "/api/admin/stats",
  auth,
  adminOnly,
  async (req, res) => {
    const users =
      await User.countDocuments();

    const products =
      await Product.countDocuments({
        active: true,
      });

    const orders =
      await Order.countDocuments();

    const revenue =
      await Order.aggregate([
        {
          $match: {
            paymentStatus:
              "PAID",
          },
        },

        {
          $group: {
            _id: null,

            total: {
              $sum: "$total",
            },
          },
        },
      ]);

    res.json({
      users,

      products,

      orders,

      revenue:
        revenue[0]?.total || 0,
    });
  }
);

/* =====================================================
   ADMIN PRODUCTS
===================================================== */

app.get(
  "/api/admin/products",
  auth,
  adminOnly,
  async (req, res) => {
    const products =
      await Product.find()
        .sort({
          createdAt: -1,
        });

    res.json({
      products,
    });
  }
);

app.post(
  "/api/admin/products",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const product =
        await Product.create(
          req.body
        );

      res.status(201).json({
        message:
          "Product created",

        product,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

app.put(
  "/api/admin/products/:id",
  auth,
  adminOnly,
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.json({
        message:
          "Product updated",

        product,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

app.delete(
  "/api/admin/products/:id",
  auth,
  adminOnly,
  async (req, res) => {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          active: false,
        },
        {
          new: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.json({
      message:
        "Product removed",

      product,
    });
  }
);

/* =====================================================
   ADMIN ORDERS
===================================================== */

app.get(
  "/api/admin/orders",
  auth,
  adminOnly,
  async (req, res) => {
    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .populate(
          "items.product"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      orders,
    });
  }
);

app.patch(
  "/api/admin/orders/:id/status",
  auth,
  adminOnly,
  async (req, res) => {
    const allowed = [
      "PLACED",
      "CONFIRMED",
      "PACKED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (
      !allowed.includes(
        req.body.status
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid status",
      });
    }

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus:
            req.body.status,
        },
        {
          new: true,
        }
      );

    if (!order) {
      return res.status(404).json({
        message:
          "Order not found",
      });
    }

    res.json({
      message:
        "Order status updated",

      order,
    });
  }
);

/* =====================================================
   CREATE ADMIN
===================================================== */

async function createAdmin() {
  const email =
    "admin@shopkart.com";

  const password =
    "Admin@12345";

  let admin =
    await User.findOne({
      email,
    });

  if (admin) {
    admin.role =
      "admin";

    await admin.save();

    console.log(
      "Admin account ready"
    );

    return;
  }

  const hashed =
    await bcrypt.hash(
      password,
      12
    );

  await User.create({
    name:
      "ShopKart Admin",

    email,

    password:
      hashed,

    role:
      "admin",
  });

  console.log(
    "Admin account created"
  );
}

/* =====================================================
   START
===================================================== */

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log(
      "MongoDB connected successfully"
    );

    await createAdmin();

    app.listen(
      PORT,
      () => {
        console.log(
          `ShopKart API running at http://localhost:${PORT}`
        );
      }
    );
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:"
    );

    console.error(
      error.message
    );

    process.exit(1);
  });