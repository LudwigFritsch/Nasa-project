const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection
  .once("open", () => {
    console.log("MongoDB connection ready");
  })
  .on("error", (err) => {
    console.error(err.message);
  });

const startServer = async () => {
  mongoose.connect(process.env.MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
};

startServer();
