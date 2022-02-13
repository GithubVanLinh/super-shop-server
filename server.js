require("dotenv").config();
require("./config/database").connectDatabase();

const http = require("http");
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

require("./routes")(app);

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("server.js", "App is Running on port", PORT);
});

// export app
// module.exports = app;
