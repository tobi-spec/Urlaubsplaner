import { JsonAdapater } from "../../src/JsonAdapter";
import { expect } from "@jest/globals";

describe("unittests for JsonAdapater", () => {

  test("test getJsonData()", async () => {
    const result = new JsonAdapater("./test/testdata/TestHolidays.json").getJsonData()
    expect(result[0]).toStrictEqual({"end": "2022-03-03", "group": "1", "id":1, "start": "2022-01-01"})
  });

  test("test getJSONDataByExpression()", async () => {
    const result = new JsonAdapater("./test/testdata/testEmployees.json").getJSONDataByExpression("employees")
    expect(result[0]).toStrictEqual({"id": "1", "name": "employee1", "password": "$2a$10$I8nZ18bhG7RfaZl1g8tMOOhrpT/hDSoo9Of.3gzUmrznXKJftUU2a"})
  });
  });
