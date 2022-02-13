const pathName = "/users";

const { UserController } = require("../controllers");

const router = require("express").Router();

router.get("/", UserController.getAll);

router.post("/", UserController.register);

// export route
module.exports = { pathName, router };
