const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SecrectKey = process.env.SecrectKey || "secret";

// export sign function
module.exports.sign = (payload) => {
  return jwt.sign(payload, SecrectKey);
};

// export verify function
module.exports.verify = (token) => {
  return jwt.verify(token, SecrectKey);
};

module.exports.hash = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports.compare = (password, hash) => {
  return bcrypt.compare(password, hash);
};
