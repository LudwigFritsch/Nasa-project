const http = require("http");
require("dotenv").config({ path: "../.env" });

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
};

startServer();
