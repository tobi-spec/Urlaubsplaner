import { createPlotConfig } from "../src/EmployeeJSONAdapter";

describe("unittest for EmployeeJSONAdapater", () => {
  test("test createPlotConfig() ", () => {
    const result = createPlotConfig();
    expect(result.type).toBe("bar");
    expect(result.data.labels).toBeTruthy;
    expect(result.options.plugins.legend.display).toBeFalsy;
    expect(result.options.indexAxis).toBe("y");
    expect(result.options.scales.xAxes.type).toBe("time");
    expect(result.options.scales.xAxes.time.unit).toBe("day");
  });
});
