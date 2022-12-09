import { Employee } from "../../src/models/Employee";
import { expect } from '@jest/globals';

describe("unittests for Employee class", () => {
  test("test Employee constructor", () => {
    const employee = new Employee("Tester", "123");
    expect(employee.name).toBe("Tester");
    expect(employee.password).toBe("123");
    expect(employee.vaccation.length).toBe(0);
  });

  test("test addVacation", () => {
    const employee = new Employee("Tester", "123");
    employee.addVacation("01-01-2022", "01-02-2022");
    const expected = [["01-01-2022", "01-02-2022"]];
    expect(employee.vaccation).toStrictEqual(expected);
  });
});
