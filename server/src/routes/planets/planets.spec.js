const request = require("supertest");

const app = require("../../app");
const { mongoConnect } = require("../../services/mongo");

describe("Planets API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  describe("Test GET /planets", () => {
    test("It should respond with 200 success", async () => {
      const response = request(app)
        .get("/planets")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
