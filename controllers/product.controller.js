const HistorySchema = require("../models/history.model");
const { ProductService } = require("../services");

// sample product
// const productList = [
//   {
//     id: 1,
//     name: "frist",
//     price: 3000,
//   },
//   {
//     id: 2,
//     name: "second",
//     price: 3000,
//   },
// ];

// ===================== A product Area =====================
// get a product by id
module.exports.getProductByProductId = async (req, res, next) => {
  // get a product by id
  const productId = req.params.id;

  try {
    // check if productId exist
    if (!productId) {
      throw new Error("Product Id is not exist");
    }

    // find a product by id
    const product = await ProductService.getById(productId);

    if (!product) {
      throw new Error("Product is not exist");
    }

    // increase count view
    product.increaseCountView();

    // return json
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// get product list by name
module.exports.getListProductByName = (req, res, next) => {
  // get list product by name
  const productName = req.query.name;
  const productListByName = productList.filter(
    (product) =>
      product.name === productName || product.name.contains(productName)
  );

  // return json
  res.status(200).json(productList);
};

// Add a product
module.exports.addProduct = async (req, res, next) => {
  // add a product to database
  const newProduct = req.body;

  console.log(
    "controllers/product.controller.js",
    "Create Product Start...",
    newProduct
  );
  try {
    // check admin
    if (!req.admin) {
      throw new Error("You are not admin");
    }

    // add create by admin
    newProduct.created_by = req.admin.id;

    // add update by admin
    newProduct.updated_by = req.admin.id;

    // create history

    newProduct.history_list = [
      {
        action: "create",
        created_by: req.admin.id,
        created_at: new Date(),
      },
    ];

    // add a product to monogoose by services
    const product = await ProductService.create(newProduct);

    console.log(
      "controllers/product.controller.js",
      "Product Created",
      product
    );

    // return a product json
    res.status(200).json(product);
  } catch (error) {
    console.log(
      "controllers/product.controller.js",
      "Error When Create Product",
      error
    );

    // return json
    res.status(400).json({
      error: error.message,
    });
  }
};

// delete a product
module.exports.deleteProduct = (req, res, next) => {
  // product id;
  const productId = req.params.id;

  // delete a product
  const product = productList.find((product) => product.id === productId);

  // remove a product from product list
  productList.splice(productList.indexOf(product), 1);

  // return json
  res.status(200).json(productList);
};

// Update a product
module.exports.updateProduct = (req, res, next) => {
  // product id;
  const productId = req.params.id;
  const product = req.body;
  const oldProduct = productList.find((product) => product.id === productId);
  const newProduct = { ...product, ...oldProduct };
  productList.map((product) => {
    if (product.id === productId) {
      return newProduct;
    } else {
      return product;
    }
  });
};

// ====================== All product area ======================

// Get all product
module.exports.getAllProduct = async (req, res, next) => {
  // product list
  const query = req.query;

  const productList = await ProductService.getAll();

  if (query.name) {
    // return json
    productList.filter(query);
    res.status(200).json(productList);
  } else {
    // return json
    res.status(200).json(productList);
  }
};
