import request from "supertest";
import app from "../src/EmployeeController";

describe("integrationtest for EmployeeController", () => {
  it("Get /status- success", async () => {
    const actual = await request(app).get("/status");
    expect(actual.statusCode).toBe(200);
    expect(actual.type).toBe("application/json");
    expect(actual.body).toBe("Server runs!");
  });

  it("Get /data - success", async () => {
    const actual = await request(app).get("/data");
    expect(actual.statusCode).toBe(200);
    expect(actual.type).toBe("application/json");
  });

  it("Get /info - success", async () => {
    const actual = await request(app).get("/index");
    expect(actual.statusCode).toBe(200);
    expect(actual.type).toBe("text/html");
  });

  it("Get /info.css - success", async () => {
    const actual = await request(app).get("/index.css");
    expect(actual.statusCode).toBe(200);
    expect(actual.type).toBe("text/css");
  });
});
