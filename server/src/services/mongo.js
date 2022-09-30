const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

mongoose.connection
  .once("open", () => {
    console.log("MongoDB connection ready");
  })
  .on("error", (err) => {
    console.error(err.message);
  });

async function mongoConnect() {
  mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
  mongoConnect,
};
