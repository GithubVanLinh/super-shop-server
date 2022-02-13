const UserService = require("../services/user.service");

// add to cart
exports.addProductToCart = async (req, res, next) => {
  // check user is logged in
  if (!req.user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  // get product id from params or body
  const productId = req.body.product_id || req.params.id;

  // get product quantity from body
  const productQuantity = +req.body.product_quantity || 1;

  // add product to cart
  try {
    const user = await UserService.getByEmail(req.user.email);

    // check if user exists
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    // check if user has cart
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
        user.cart.push({
          product_id: productId,
          product_quantity: productQuantity,
        });
        await user.save();
      }
    } else {
      // add new cart item
      user.cart = [
        {
          product_id: productId,
          product_quantity: productQuantity,
        },
      ];
      await user.save();
    }
    res.status(201).json({
      message: "Product added to cart",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
