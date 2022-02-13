// require mongoose
const mongoose = require("mongoose");
const HistorySchema = require("./history.model");

// require Schema
const Schema = mongoose.Schema;

// create new instance of Schema
// Product Schema contains: name, price, description, images, original_price, discount_price, category_id, status, created_at, updated_at, created_by, updated_by, history_list, is_deleted, count_view, count_buy, count_product, rating_list
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    get: (v) => original_price - discount_price,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  images: {
    type: Array,
    required: true,
    default: [],
  },
  original_price: {
    type: Number,
    required: true,
    default: 0,
  },
  discount_price: {
    type: Number,
    required: true,
    default: 0,
  },
  category_id: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: true,
  },
  updated_by: {
    type: String,
    required: false,
  },
  history_list: {
    type: [HistorySchema],
    required: true,
    default: [],
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  count_view: {
    type: Number,
    required: true,
    default: 0,
  },
  count_buy: {
    type: Number,
    required: true,
    default: 0,
  },
  count_product: {
    type: Number,
    required: true,
    default: 0,
  },
  rating_list: {
    type: Array,
    required: true,
    default: [],
  },
});

// create model from schema
const Product = mongoose.model("Product", ProductSchema);

// check product on before save
// Product.schema.pre("save", async function (next) {
//   try {
//     const product = await Product.findOne({ name: this.name });
//     if (product) {
//       next(new Error("Product name is existed"));
//     }
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// add propeties to prototype
// Product.prototype.toJSON = function () {
//   const product = this.toObject();
//   delete product.__v;
//   return product;
// };

// // calculate discount price
// Product.prototype.calculateDiscountPrice = function () {
//   const discountPrice = this.original_price - this.discount_price;
//   return discountPrice;
// };

// increase count view
Product.prototype.increaseCountView = async function () {
  try {
    this.count_view += 1;
    console.log(
      "models/product.model.js",
      "Increase Count View",
      this.count_view
    );
    await this.save();
  } catch (err) {
    throw err;
  }
};

// export model
module.exports = Product;
