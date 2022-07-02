import { createUser } from "../src/AuthenticationJSONAdapter";
import fs from "fs";

describe("unittests for UserJSONAdapater", () => {
  afterEach(() => {
    const jsonObject = {
      employees: [
        {
          user: "employee1",
          credentials: { email: "user@user.de", passwort: "user123" },
          vaccation: [
            ["2022-01-01", "2022-03-03"],
            ["2022-10-01", "2022-11-01"]
          ]
        }
      ]
    };
    const path = "./data/testData.json";
    const writeObject = JSON.stringify(jsonObject);
    fs.writeFileSync(path, writeObject);
  });

  test("test storeUserCredentials()", () => {
    const testPath = "./data/testData.json";
    createUser(testPath, "testUser", "user@user.de", "user456");
    const rawData = fs.readFileSync(testPath, "utf-8");
    const data = JSON.parse(rawData);
    const expected = {
      name: "testUser",
      credentials: {
        email: "user@user.de",
        passwort: "user456"
      },
      vaccation: []
    };
    expect(data["employees"][1]).toStrictEqual(expected);
  });
});
