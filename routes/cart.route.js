const pathName = "/cart";

const router = require("express").Router();

const CartController = require("../controllers/cart.controller");
const { AuthenticationUser } = require("../middlewares/auth.middleware");

// add new product to cart
router.post("/", AuthenticationUser, CartController.addProductToCart);

// export route
module.exports = { pathName, router };
