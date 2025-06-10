import request from "supertest";
import app from "../app.js";

describe("authRouter", () => {
  describe("POST /register", () => {
    it("creates an user if data is correct", async () => {
      const defaultUserInfo = {
        firstName: "Default",
        lastName: "User",
        password: "Password@1",
      };

      const res = await request(app).post("/register").send(defaultUserInfo);

      expect(res.status).toBe(200);
    });
  });
});
