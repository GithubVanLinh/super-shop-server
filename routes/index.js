const productRoute = require("./product.route");
const usersRoute = require("./users.route");
const authenticationRoute = require("./authentication.route");
const userRoute = require("./user.route");
const cartRoute = require("./cart.route");

module.exports = function initRoute(app) {
  app.use(productRoute.pathName, productRoute.router);
  app.use(authenticationRoute.pathName, authenticationRoute.router);
  app.use(usersRoute.pathName, usersRoute.router);
  app.use(userRoute.pathName, userRoute.router);
  app.use(cartRoute.pathName, cartRoute.router);
};
