const UserModel = require("../models/user.model");
const CartModel = require("../models/cart.model");

// add a product to cart
exports.addProductToCart = async ({ productId, product_quantity }, userId) => {
  try {
    // get user id from req
    // const userId = req.user.id;

    // get product id from req
    // const productId = req.body.productId || req.params.id;
    const productQuantity = +product_quantity || 1;

    // get product by id
    const product = await ProductModel.findById(productId);

    // create a new cart
    const newCart = new CartModel({
      product_id: productId,
      product_quantity: productQuantity,
    });

    // save a new cart to database
    const user = await UserModel.findById(userId);
    // check if user has cart item
    if (user.cart) {
      // check if user has this product
      const cartItem = user.cart.find(
        (cartItem) => cartItem.product_id === productId
      );
      if (cartItem) {
        // update cart item
        cartItem.product_quantity += productQuantity;
        await user.save();
      } else {
        // add new cart item

        user.cart.push(newCart);
        await user.save();
      }
    } else {
      // add new cart item
      user.cart = [newCart];
      await user.save();
    }
    // return product
    return product;
  } catch (error) {
    throw error;
  }
};
