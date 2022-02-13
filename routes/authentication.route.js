const { UserController } = require("../controllers");

const pathName = "/authentications";

// require router
const router = require("express").Router();

router.post("/login", UserController.login);

// export route
module.exports = { pathName, router };
