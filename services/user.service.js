// require User Model
const { Status } = require("../models");
const { User } = require("../models");
const { Auth } = require("../utils");

// create user
module.exports.create = async (userData) => {
  try {
    // log userData
    console.log(userData);

    // check if user already exists
    const isExsist = await User.findOne({ email: userData.email });
    if (isExsist) {
      throw new Error("User already exists");
    }

    // hash password;
    userData.password = await Auth.hash(userData.password);

    const user = new User(userData);
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

// get user by id
exports.getById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

// update user
exports.update = async (id, userData) => {
  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

// delete user
exports.delete = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(id, { status: Status.Deleted });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw err;
  }
};

// get user list
module.exports.getList = async () => {
  try {
    const userList = await User.find({});

    // return json
    return userList;
  } catch (error) {
    console.log(
      "controllers/user.controller.js",
      "Error When Get User List",
      error
    );

    // return json
    throw error;
  }
};

// get active user list
module.exports.getActiveList = async () => {
  try {
    const userList = await User.find({ status: Status.Active });

    // return json
    return userList;
  } catch (error) {
    console.log(
      "controllers/user.controller.js",
      "Error When Get User List",
      error
    );

    // return json
    throw error;
  }
};

// get by email
exports.getByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw err;
  }
};
