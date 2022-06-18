import request from 'supertest';
import app from '../src/EmployeeController'


describe("integrationtest for EmployeeController", () => {

    it("Get /status- success", async () => {
      const actual = await request(app).get("/status")
      expect(actual.statusCode).toBe(200)
      expect(actual.type).toBe("application/json")
      expect(actual.body).toBe("Server runs!")
    })

    it("Get /data - success", async() => {
      const actual = await request(app).get("/data")
      expect(actual.statusCode).toBe(200)
      expect(actual.type).toBe("application/json")
      expect(actual.body.type).toBe("bar")
    })


})
