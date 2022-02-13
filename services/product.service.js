// import model from "./index";
const { Product } = require("../models");

// create product
module.exports.create = async (productData) => {
  try {
    // log productData
    console.log(productData);

    const product = new Product(productData);
    await product.save();

    return product;
  } catch (err) {
    throw err;
  }
};

// get product by id
exports.getById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (err) {
    throw err;
  }
};

// update product
exports.update = async (id, productData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (err) {
    throw err;
  }
};

// delete product
exports.delete = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (err) {
    throw err;
  }
};

// get product by name
exports.getByName = async (name) => {
  try {
    const product = await Product.findOne({ name: new RegExp(name, "i") });
    if (!product) {
      return null;
    }
    return product;
  } catch (err) {
    throw err;
  }
};

// get all products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();

    return products;
  } catch (err) {
    throw err;
  }
};

// All methods for product
