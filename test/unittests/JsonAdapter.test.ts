import { JsonAdapater } from "../../src/JsonAdapter";
import { Employee } from "../../src/employee/Employee";
import fs from "fs";
import bcrypt from "bcrypt";
import { expect } from "@jest/globals";

describe("unittests for EmployeeJSONAdapater", () => {
  const testPath = "./data/testData.json";

  beforeEach(() => {
    const employee = new Employee(
      "employee1",
      "$2a$10$I8nZ18bhG7RfaZl1g8tMOOhrpT/hDSoo9Of.3gzUmrznXKJftUU2a"
    );
    employee.addVacation("2022-01-01", "2022-03-03");
    employee.addVacation("2022-10-01", "2022-11-01");

    const testData = { employees: [employee] };

    const path = "./data/testData.json";
    const jsonObject = JSON.stringify(testData, null, "\t");
    fs.writeFileSync(path, jsonObject);
  });

  test("test createEmployee()", async () => {
    const employeeJSONAdapater = new JsonAdapater(testPath);
    await employeeJSONAdapater.createEmployee("testUser", "user456");

    const rawData = fs.readFileSync(testPath, "utf-8");
    const data = JSON.parse(rawData);
    const actual = data["employees"][1];

    expect(Object.values(actual)[0]).toBe("testUser");
    expect(bcrypt.compareSync("user456", Object.values(actual)[1])).toBe(true);
    expect(Object.values(actual)[2]).toEqual([]);
  });

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
