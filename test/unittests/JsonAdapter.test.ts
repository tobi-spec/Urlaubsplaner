import { JsonAdapater } from "../../src/JsonAdapter";
import fs from "fs";
import bcrypt from "bcrypt";
import { expect } from "@jest/globals";

describe("unittests for EmployeeJSONAdapater", () => {
  const testPath = "./data/testData.json";

  test("test getEmployeeByName()", async () => {
    const employeeJSONAdapater = new JsonAdapater(testPath);
    const employee = await employeeJSONAdapater.getEmployeeByName("employee1");

    expect(Object.values(employee)[0]).toBe("employee1");
    expect(Object.values(employee)[1]).toBe(
      "$2a$10$I8nZ18bhG7RfaZl1g8tMOOhrpT/hDSoo9Of.3gzUmrznXKJftUU2a"
    );
    expect(Object.values(employee)[2]).toStrictEqual([
      ["2022-01-01", "2022-03-03"],
      ["2022-10-01", "2022-11-01"]
    ]);
  });
});
