import { createPlotConfig } from "../src/EmployeeJSONAdapter";

describe("Test EmployeeJSONAdapater", () => {
  test("If ", () => {
    const result = createPlotConfig();
    expect(result.data.labels).toBeTruthy;
  });
});
