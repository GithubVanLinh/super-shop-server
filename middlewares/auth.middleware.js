const UserService = require("../services/user.service");
const { Auth } = require("../utils");

// export authentication middleware
module.exports.AuthenticationUser = async (req, res, next) => {
  try {
    // get token from header
    const token = req.headers.authorization;

    // check if token is valid
    const payload = await Auth.verify(token);
    if (!payload) {
      throw new Error("Token is not valid");
    }

    // get user by token
    const user = await UserService.getByEmail(payload.email);
    if (!user) {
      throw new Error("User not found");
    }

    // clone user data only includes id, name, email
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      cart: user.cart,
    };

    // set user to req
    req.user = userData;

    // go to next middleware
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

// export admin middleware
module.exports.AuthenticationAdmin = async (req, res, next) => {
  try {
    // get token from header
    const token = req.headers.authorization;

    // check if token is valid
    const payload = await Auth.verify(token);
    if (!payload) {
      throw new Error("Token is not valid");
    }

    // get user by token
    const user = await UserService.getByEmail(payload.email);
    if (!user) {
      throw new Error("User not found");
    }

    // check if user is admin
    if (user.role !== "admin") {
      throw new Error("User is not admin");
    }

    // clone user data only includes id, name, email
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // set user to req
    req.admin = userData;

    // go to next middleware
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
