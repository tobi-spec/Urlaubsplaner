import { expect } from "@jest/globals";
import { CalendarService } from "../../src/calendar/CalendarService";

const calendarService = new CalendarService(
                          "./test/testdata/TestHolidays.json",
                          "./test/testdata/testEmployees.json"
                          )

describe("unittests for CalendarService", () => {

  test("test createItems()", async () => {
    const result = calendarService.createItems()
    expect(result).toStrictEqual([
      {"id": 1, "start": "2022-01-01", "end": "2022-03-03", "group": "1"},
      {"id": 2,"start": "2022-10-03", "end": "2022-11-30", "group": "1"},
      {"id": 3,"start": "2022-04-03", "end": "2022-04-23", "group": "2"}
  ])
  });

  test("test createGroups()", async () => {
    const result = calendarService.createGroups()
    expect(result).toStrictEqual({"content": "employee1", "id": "1"})
  });

  test("test createOptions()", async () => {
    const result = calendarService.createOptions()
    expect(result).toBeNull()
  });

  });