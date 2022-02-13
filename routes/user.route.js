const pathName = "/user";

const { UserController } = require("../controllers");
const { AuthenticationUser } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", AuthenticationUser, UserController.getInfo);

module.exports = { pathName, router };
