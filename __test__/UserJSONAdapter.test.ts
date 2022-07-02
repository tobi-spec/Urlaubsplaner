import { storeUserData } from "../src/UserJSONAdapter";
import fs from "fs";

describe("unittests for UserJSONAdapater", () => {
  test("test storeUserData()", () => {
    const testPath = "./data/testUser.json";
    storeUserData(testPath, "testUser", "user@user.de", "user123");
    const rawData = fs.readFileSync(testPath, "utf-8");
    const data = JSON.parse(rawData)
    const expected = { name: 'testUser', email: 'user@user.de', passwort: 'user123' }
    expect(data["user"][0]).toStrictEqual(expected)
  });
});
