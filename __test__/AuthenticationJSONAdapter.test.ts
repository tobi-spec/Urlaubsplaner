import { createEmployee } from "../src/EmployeeJSONAdapter";
import { Employee } from "../src/objects/Employee";
import fs from "fs";

describe("unittests for EmployeeJSONAdapater", () => {
  beforeEach(() => {
    const employee = new Employee("employee1", "user123")
    employee.addVacation("2022-01-01", "2022-03-03")
    employee.addVacation("2022-10-01", "2022-11-01")

    const testData = { "employees": [employee]}

    const path = "./data/testData.json";
    const jsonObject = JSON.stringify(testData, null, "\t")
    fs.writeFileSync(path, jsonObject);
  });

  test("test createEmployee()", () => {
    const testPath = "./data/testData.json";
    createEmployee(testPath, "testUser", "user456");

    const rawData = fs.readFileSync(testPath, "utf-8");
    const actual = JSON.parse(rawData);

    expect(actual["employees"][1]).toBeTruthy;
  });
});
