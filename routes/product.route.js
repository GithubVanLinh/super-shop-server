const pathName = "/products";

const { ProductController } = require("../controllers");
const { AuthenticationAdmin } = require("../middlewares/auth.middleware");

const router = require("express").Router();

// Get all product
router.get("/", ProductController.getAllProduct);

// Get product by name
router.get("/", ProductController.getListProductByName);

// Get product by id
router.get("/:id", ProductController.getProductByProductId);

// Add a product
router.post("/", AuthenticationAdmin, ProductController.addProduct);

// Delete a product
router.delete("/:id", AuthenticationAdmin, ProductController.deleteProduct);

// Update a product
router.put("/:id", AuthenticationAdmin, ProductController.updateProduct);

module.exports = { pathName, router };
