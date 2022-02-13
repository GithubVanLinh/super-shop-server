const databasePath = process.env.DATABASEPATH || null;

const mongoose = require("mongoose");

module.exports.connectDatabase = async () => {
  //  connect mongoose db
  try {
    if (databasePath) {
      await mongoose.connect(databasePath);
      console.log("config/database.js", "Connected to database!");
    } else throw new Error("Database Path is Not Found...");
  } catch (error) {
    console.log(
      "config/database.js",
      "Error when connect database server",
      error
    );
  }
};
