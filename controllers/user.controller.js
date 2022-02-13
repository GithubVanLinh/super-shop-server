// require jwt
const jwt = require("jsonwebtoken");

// require user service
const UserService = require("../services/user.service");
const { Auth } = require("../utils");

// login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await UserService.getByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // check password
    const isPasswordMatch = await Auth.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Password is incorrect");
    }

    // create token
    const token = Auth.sign({ name: user.name, email: user.email });

    // store token as access token
    user.access_token = token;
    await user.save();

    // send response
    res.json({
      user: user.toJSON(),
      token,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

// get all user
exports.getAll = async (req, res, next) => {
  try {
    const userList = await UserService.getList();

    // return json
    res.status(200).json(userList);
  } catch (error) {
    console.log(
      "controllers/user.controller.js",
      "Error When Get User List",
      error
    );

    // return json
    res.status(400).json({
      error: error.message,
    });
  }
};

// register user
exports.register = async (req, res, next) => {
  try {
    // create user
    const user = await UserService.create(req.body);

    // send response
    res.status(200).json(user);
  } catch (error) {
    console.log(
      "controllers/user.controller.js",
      "Error When Create User",
      error
    );

    // return json
    res.status(400).json({
      error: error.message,
    });
  }
};

// get user info
exports.getInfo = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("User not found");
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.log(
      "controllers/user.controller.js",
      "Error When Get User Info",
      error
    );

    // return json
    res.status(400).json({
      error: error.message,
    });
  }
};
